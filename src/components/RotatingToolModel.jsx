import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = '/models/aone-tooling.glb'

function fitModelToScene(model) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxAxis = Math.max(size.x, size.y, size.z) || 1

  model.position.sub(center)
  model.scale.setScalar(4.2 / maxAxis)

  const fittedBox = new THREE.Box3().setFromObject(model)
  const fittedCenter = fittedBox.getCenter(new THREE.Vector3())
  model.position.sub(fittedCenter)
}

function disposeScene(scene) {
  scene.traverse((item) => {
    if (item.geometry) item.geometry.dispose()
    if (item.material) {
      if (Array.isArray(item.material)) item.material.forEach((material) => material.dispose())
      else item.material.dispose()
    }
  })
}

export default function RotatingToolModel({ progress }) {
  const hostRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      progressRef.current = value
    })

    return unsubscribe
  }, [progress])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0.7, 7.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    host.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight('#ffffff', '#a9afb5', 2.2))

    const key = new THREE.DirectionalLight('#ffffff', 4)
    key.position.set(4, 5, 6)
    key.castShadow = true
    scene.add(key)

    const fill = new THREE.DirectionalLight('#dfe8ff', 1.4)
    fill.position.set(-4, 1, 3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight('#ff2e2e', 1.35)
    rim.position.set(-5, 3, -4)
    scene.add(rim)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3.4, 96),
      new THREE.ShadowMaterial({ opacity: 0.12 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.55
    floor.receiveShadow = true
    scene.add(floor)

    const modelRoot = new THREE.Group()
    modelRoot.rotation.set(-0.12, -0.7, 0.03)
    scene.add(modelRoot)

    let activeModel = null
    let sampled = false
    let disposed = false

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    host.dataset.modelStatus = 'loading'
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return

        activeModel = gltf.scene
        activeModel.traverse((item) => {
          if (item.isMesh) {
            item.castShadow = true
            item.receiveShadow = true
            if (item.material) {
              item.material.side = THREE.FrontSide
              
              // Custom Color Override - Change the hex code here to change the model color!
              item.material.color.set('#eceff1') // Polished Metallic Silver
              
              // Enhance metallic / technical lighting reflectivity
              if (item.material.isMeshStandardMaterial || item.material.isMeshPhysicalMaterial) {
                item.material.metalness = 0.85
                item.material.roughness = 0.15
              }
              
              item.material.needsUpdate = true
            }
          }
        })

        fitModelToScene(activeModel)
        modelRoot.add(activeModel)
        host.dataset.modelStatus = 'loaded'
      },
      undefined,
      (error) => {
        host.dataset.modelStatus = 'error'
        host.dataset.modelError = error?.message || 'Unable to load GLB model'
      }
    )

    const resize = () => {
      const rect = host.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height, false)
      camera.aspect = rect.width / Math.max(rect.height, 1)
      camera.updateProjectionMatrix()
    }

    const samplePixels = () => {
      const gl = renderer.getContext()
      const pixels = new Uint8Array(4 * 20 * 20)
      gl.readPixels(
        Math.floor(renderer.domElement.width / 2) - 10,
        Math.floor(renderer.domElement.height / 2) - 10,
        20,
        20,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels
      )

      let nonTransparent = 0
      let brightness = 0
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) nonTransparent += 1
        brightness += pixels[i] + pixels[i + 1] + pixels[i + 2]
      }

      host.dataset.pixelCheck = JSON.stringify({ nonTransparent, brightness })
    }

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const p = progressRef.current
      modelRoot.rotation.y = -0.75 + p * Math.PI * 1.85
      modelRoot.rotation.x = -0.12 + Math.sin(p * Math.PI) * 0.18
      modelRoot.rotation.z = 0.03 + p * 0.12
      modelRoot.position.y = Math.sin(p * Math.PI * 2) * 0.08
      host.dataset.rotationY = modelRoot.rotation.y.toFixed(4)
      renderer.render(scene, camera)

      if (!sampled && activeModel) {
        sampled = true
        samplePixels()
      }
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      disposeScene(scene)
      dracoLoader.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="three-model-shell">
      <div ref={hostRef} className="three-model-canvas" aria-label="Rotating 3D tooling model" />
      <div className="model-readout">
        <span>Scroll linked rotation</span>
        <strong>Loaded GLB tooling model</strong>
      </div>
    </div>
  )
}
