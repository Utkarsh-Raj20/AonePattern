import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const MODEL_URL = '/models/2.glb'

function fitModelToScene(model) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxAxis = Math.max(size.x, size.y, size.z) || 1

  model.position.sub(center)
  model.scale.setScalar(4 / maxAxis)

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
  const visibleRef = useRef(true)

  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      progressRef.current = value
    })
    return unsubscribe
  }, [progress])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )

    observer.observe(host.parentElement || host)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 7.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.9
    renderer.shadowMap.enabled = false
    host.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap
    scene.environmentIntensity = 0.3
    scene.background = new THREE.Color('#111111')

    scene.add(new THREE.HemisphereLight('#c8d0d8', '#2a2e35', 0.8))

    const key = new THREE.DirectionalLight('#ffffff', 3.2)
    key.position.set(5, 6, 5)
    scene.add(key)

    const fill = new THREE.DirectionalLight('#c8ddf8', 0.9)
    fill.position.set(-4, 1.5, 3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight('#ff2e2e', 1.5)
    rim.position.set(-5, 2.5, -4)
    scene.add(rim)

    // bottom fill handled by hemisphere ground color



    const modelRoot = new THREE.Group()
    modelRoot.rotation.set(-0.12, -0.7, 0.03)
    scene.add(modelRoot)

    let activeModel = null
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
            if (item.material) {
              item.material.side = THREE.FrontSide
              item.material.color.set('#8a9199')
              item.material.metalness = 0.78
              item.material.roughness = 0.32
              item.material.envMapIntensity = 0.4
              if (item.material.isMeshPhysicalMaterial) {
                item.material.clearcoat = 0.15
                item.material.clearcoatRoughness = 0.25
              }
              item.material.needsUpdate = true
            }
          }
        })

        activeModel.rotation.set(0, 0, -Math.PI / 2)
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

    let resizeTimer
    const resize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const rect = host.getBoundingClientRect()
        renderer.setSize(rect.width, rect.height, false)
        camera.aspect = rect.width / Math.max(rect.height, 1)
        camera.updateProjectionMatrix()
      }, 100)
    }

    let frame = 0
    const animate = () => {
      if (visibleRef.current) {
        const p = progressRef.current
        modelRoot.rotation.y = -0.75 + p * Math.PI * 1.85
        modelRoot.rotation.x = -0.12 + Math.sin(p * Math.PI) * 0.18
        modelRoot.rotation.z = 0.03 + p * 0.12
        modelRoot.position.y = Math.sin(p * Math.PI * 2) * 0.08
        renderer.render(scene, camera)
      }
      frame = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      disposeScene(scene)
      envMap.dispose()
      pmrem.dispose()
      dracoLoader.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="three-model-shell">
      <div ref={hostRef} className="three-model-canvas" aria-label="Rotating 3D tooling model" />
      <div className="model-loading">Loading 3D model...</div>
      <div className="model-error">
        <span>Unable to load 3D model</span>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    </div>
  )
}
