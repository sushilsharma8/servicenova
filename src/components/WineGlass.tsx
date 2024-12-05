import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WineGlass = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create wine glass
    const glassGeometry = new THREE.Group();

    // Bowl
    const bowlGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const bowlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      metalness: 0,
      transmission: 1,
    });
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowl.position.y = 1.5;
    glassGeometry.add(bowl);

    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
    const stemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      metalness: 0,
      transmission: 1,
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.75;
    glassGeometry.add(stem);

    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    const base = new THREE.Mesh(baseGeometry, stemMaterial);
    base.position.y = 0;
    glassGeometry.add(base);

    scene.add(glassGeometry);

    // Position camera
    camera.position.z = 5;
    camera.position.y = 1;

    // Animation
    let rotation = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      rotation += 0.01;
      glassGeometry.rotation.y = rotation;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-[300px] h-[300px] mx-auto" />;
};

export default WineGlass;