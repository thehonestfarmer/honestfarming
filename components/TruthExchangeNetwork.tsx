'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface NetworkConfig {
  backgroundColor: string;
  backgroundColorDark: string;
  particleColors: string[];
  connectionColor: string;
  connectionColorDark: string;
  particleCount: number;
  particleSize: number;
  maxConnectionDistance: number;
  baseSpeed: number;
  pulseStrength: number;
  connectionOpacity: number;
  mobile: ResponsiveConfig;
  tablet: ResponsiveConfig;
  desktop: ResponsiveConfig;
  // Hero-specific enhancements
  networkGrowthRate?: number;
  connectionPersistence?: number;
  centralGravity?: number;
  connectionGlow?: boolean;
  nodeHierarchy?: boolean;
  colorEvolution?: boolean;
  focusedClustering?: boolean;
  businessTheme?: boolean;
}

interface ResponsiveConfig {
  particleCount: number;
  maxDistance: number;
}

interface NodePosition {
  x: number;
  y: number;
}

interface NodeVelocity {
  vx: number;
  vy: number;
}

interface NodeProperties {
  id: number;
  strength: number;
  age: number;
  pulse: number;
  angle: number;
  angularVelocity: number;
  size: number;
  color: string;
  connections: Set<number>;
  connectionMemory: Set<number>;
  networkPulsePhase: number;
  baseSize: number;
  connectionStrengths: Map<number, number>;
  isHub: boolean;
  hubStrength: number;
  colorEvolutionPhase: number;
}

const config: NetworkConfig = {
  backgroundColor: '#f5f5f4', // stone-100
  backgroundColorDark: '#334155', // slate-700
  particleColors: ['#22c55e', '#16a34a', '#15803d', '#166534'],
  connectionColor: '#10b981',
  connectionColorDark: '#68d391', // Lighter green for better contrast
  
  particleCount: 80,
  particleSize: 3,
  maxConnectionDistance: 120,
  
  baseSpeed: 0.3,
  pulseStrength: 0.2,
  connectionOpacity: 0.1,
  
  mobile: { particleCount: 10, maxDistance: 80 },
  tablet: { particleCount: 45, maxDistance: 100 },
  desktop: { particleCount: 60, maxDistance: 120 },
  
  // Hero-specific defaults
  networkGrowthRate: 0.01,
  connectionPersistence: 0.5,
  centralGravity: 0.0005,
  connectionGlow: false,
  nodeHierarchy: false,
  colorEvolution: false,
  focusedClustering: false,
  businessTheme: false
};

// Enhanced config for hero section - optimized for text readability
export const heroNetworkConfig: Partial<NetworkConfig> = {
  particleCount: 250,
  particleSize: 2,
  maxConnectionDistance: 140,
  connectionOpacity: 0.35,
  pulseStrength: 0.2,
  networkGrowthRate: 0.015,
  connectionPersistence: 0.6,
  centralGravity: 0.0008,
  connectionGlow: true,
  nodeHierarchy: true,
  colorEvolution: false,
  mobile: { particleCount: 38, maxDistance: 90 },
  tablet: { particleCount: 150, maxDistance: 110 },
  desktop: { particleCount: 188, maxDistance: 140 }
};

// Reduced config for product card
export const productNetworkConfig: Partial<NetworkConfig> = {
  particleCount: 40,
  particleSize: 3,
  maxConnectionDistance: 100,
  connectionOpacity: 0.6,
  focusedClustering: true,
  businessTheme: true
};

class KnowledgeNode implements NodePosition, NodeVelocity, NodeProperties {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public id: number;
  public angle: number;
  public angularVelocity: number;
  public size: number;
  public color: string;
  public pulse: number;
  public strength: number;
  public connections: Set<number>;
  public connectionMemory: Set<number>;
  public networkPulsePhase: number;
  public baseSize: number;
  public connectionStrengths: Map<number, number>;
  public age: number;
  public isHub: boolean;
  public hubStrength: number;
  public colorEvolutionPhase: number;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
    
    // Central node (id 0) has different properties
    if (id === 0) {
      this.vx = 0; // Central node stays stationary
      this.vy = 0;
      this.angle = 0;
      this.angularVelocity = 0;
      this.baseSize = config.particleSize * 3; // 3x larger
      this.size = this.baseSize;
      this.color = config.particleColors[0]; // Start with first color
      this.isHub = true;
      this.hubStrength = 1.0;
      this.strength = 1.0;
    } else {
      this.vx = (Math.random() - 0.5) * config.baseSpeed;
      this.vy = (Math.random() - 0.5) * config.baseSpeed;
      this.angle = Math.random() * Math.PI * 2;
      this.angularVelocity = (Math.random() - 0.5) * 0.02;
      this.baseSize = config.particleSize;
      this.size = this.baseSize;
      this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
      this.isHub = false;
      this.hubStrength = 0;
      this.strength = Math.random();
    }
    
    this.pulse = Math.random() * Math.PI * 2;
    this.networkPulsePhase = Math.random() * Math.PI * 2;
    this.connections = new Set();
    this.connectionMemory = new Set();
    this.connectionStrengths = new Map();
    this.age = 0;
    this.colorEvolutionPhase = Math.random() * Math.PI * 2;
  }
  
  public update(deltaTime: number, canvasWidth: number, canvasHeight: number, allNodes?: KnowledgeNode[], networkConfig?: Partial<NetworkConfig>): void {
    // Central node (id 0) stays in center and doesn&apos;t move
    if (this.id === 0) {
      this.x = canvasWidth / 2;
      this.y = canvasHeight / 2;
      this.pulse += 0.08; // Faster pulse for central node
      this.colorEvolutionPhase += 0.03; // Color evolution for central node only
      this.age += deltaTime;
      return;
    }
    
    // Network-based speed reduction
    const connectionCount = this.connections.size;
    const speedMultiplier = 1 / (1 + connectionCount * 0.3);
    
    this.angle += this.angularVelocity;
    this.vx += Math.cos(this.angle) * 0.01;
    this.vy += Math.sin(this.angle) * 0.01;
    
    // Central gravity (hero enhancement)
    if (networkConfig?.centralGravity) {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const dxToCenter = centerX - this.x;
      const dyToCenter = centerY - this.y;
      const distanceToCenter = Math.sqrt(dxToCenter * dxToCenter + dyToCenter * dyToCenter);
      
      if (distanceToCenter > 0) {
        const gravityForce = networkConfig.centralGravity;
        this.vx += (dxToCenter / distanceToCenter) * gravityForce;
        this.vy += (dyToCenter / distanceToCenter) * gravityForce;
      }
    }
    
    // Apply gravitational attraction to connected nodes
    if (allNodes && this.connections.size > 0) {
      let attractionX = 0;
      let attractionY = 0;
      
      for (const connectedId of this.connections) {
        const connectedNode = allNodes.find(node => node.id === connectedId);
        if (connectedNode) {
          const dx = connectedNode.x - this.x;
          const dy = connectedNode.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const strength = this.connectionStrengths.get(connectedId) || 0.5;
            const force = strength * 0.02 / distance;
            attractionX += (dx / distance) * force;
            attractionY += (dy / distance) * force;
          }
        }
      }
      
      this.vx += attractionX;
      this.vy += attractionY;
    }
    
    const maxSpeed = config.baseSpeed * speedMultiplier;
    this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
    this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));
    
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    
    this.pulse += 0.05;
    this.networkPulsePhase += 0.03;
    this.age += deltaTime;
    this.colorEvolutionPhase += 0.01;
    
    // Update hub status based on connections (hero enhancement)
    if (networkConfig?.nodeHierarchy) {
      if (connectionCount >= 3 && !this.isHub) {
        this.isHub = true;
        this.hubStrength = 0.5;
      }
      if (this.isHub) {
        this.hubStrength = Math.min(1.0, this.hubStrength + 0.01);
      }
    }
    
    // Update node size based on connections and hub status
    let targetSize = this.baseSize + (connectionCount * 0.5);
    if (this.isHub) {
      targetSize += this.hubStrength * 2;
    }
    this.size = this.size + (targetSize - this.size) * 0.1;
  }
  
  public draw(ctx: CanvasRenderingContext2D, globalNetworkPulse: number = 0, networkConfig?: Partial<NetworkConfig>): void {
    let pulseSize = this.size + Math.sin(this.pulse) * (networkConfig?.pulseStrength || config.pulseStrength);
    
    // Add network synchronization pulse for connected nodes
    if (this.connections.size > 0) {
      const networkPulse = Math.sin(globalNetworkPulse + this.networkPulsePhase) * 0.3;
      pulseSize += networkPulse;
    }
    
    // Color intensity based on connections
    const connectionRatio = Math.min(this.connections.size / 5, 1);
    let alpha = 0.7 + (connectionRatio * 0.3);
    
    // Hub highlighting
    if (this.isHub) {
      alpha += this.hubStrength * 0.2;
    }
    
    // Color evolution only for central node (id 0)
    let drawColor = this.color;
    if (this.id === 0) {
      const evolutionFactor = (Math.sin(this.colorEvolutionPhase) + 1) / 2;
      const colorIndex = Math.floor(evolutionFactor * config.particleColors.length);
      drawColor = config.particleColors[colorIndex];
      
      // Extra visual enhancement for central node
      const glowIntensity = (Math.sin(this.pulse) + 1) / 2;
      alpha += glowIntensity * 0.3;
    }
    
    ctx.fillStyle = drawColor;
    ctx.globalAlpha = alpha;
    
    // Special rendering for central node
    if (this.id === 0) {
      // Draw glow effect
      const glowSize = pulseSize * 2;
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, glowSize / 2
      );
      gradient.addColorStop(0, drawColor);
      gradient.addColorStop(0.5, drawColor + '80'); // Semi-transparent
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = alpha * 0.3;
      ctx.fillRect(
        Math.floor(this.x - glowSize / 2),
        Math.floor(this.y - glowSize / 2),
        Math.floor(glowSize),
        Math.floor(glowSize)
      );
      
      // Draw main central particle
      ctx.fillStyle = drawColor;
      ctx.globalAlpha = alpha;
    }
    
    ctx.fillRect(
      Math.floor(this.x - pulseSize / 2), 
      Math.floor(this.y - pulseSize / 2), 
      Math.floor(pulseSize), 
      Math.floor(pulseSize)
    );
    
    ctx.globalAlpha = 1;
  }

  public distanceTo(other: KnowledgeNode): number {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + 
      Math.pow(this.y - other.y, 2)
    );
  }
  
  public addConnection(nodeId: number, strength: number = 0.5): boolean {
    if (this.connections.size >= 5) return false; // Max 5 connections
    
    this.connections.add(nodeId);
    this.connectionMemory.add(nodeId);
    this.connectionStrengths.set(nodeId, strength);
    return true;
  }
  
  public removeConnection(nodeId: number): void {
    this.connections.delete(nodeId);
    // Keep in memory for potential reconnection
  }
  
  public strengthenConnection(nodeId: number, amount: number = 0.1): void {
    const currentStrength = this.connectionStrengths.get(nodeId) || 0.5;
    this.connectionStrengths.set(nodeId, Math.min(1.0, currentStrength + amount));
  }
}

class ConnectionRenderer {
  public static drawConnection(
    ctx: CanvasRenderingContext2D, 
    node1: KnowledgeNode, 
    node2: KnowledgeNode, 
    opacity: number,
    isDarkMode: boolean = false,
    networkConfig?: Partial<NetworkConfig>
  ): void {
    const distance = node1.distanceTo(node2);
    const maxDistance = networkConfig?.maxConnectionDistance || config.maxConnectionDistance;
    
    if (distance > maxDistance) return;
    
    const baseStrength = (1 - distance / maxDistance) * 
                        Math.min(node1.strength, node2.strength);
    
    // Enhanced connection strength based on relationship
    const connectionStrength = node1.connectionStrengths.get(node2.id) || baseStrength;
    let lineWidth = 1 + (connectionStrength * 2);
    
    // Hub connection enhancement
    if (node1.isHub || node2.isHub) {
      lineWidth += 1;
    }
    
    // Enhanced glow effect for hero networks (reduced for text readability)
    if (networkConfig?.connectionGlow) {
      ctx.strokeStyle = isDarkMode ? config.connectionColorDark : config.connectionColor;
      ctx.globalAlpha = (connectionStrength * opacity) * 0.2;
      ctx.lineWidth = lineWidth + 2;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(Math.floor(node1.x), Math.floor(node1.y));
      ctx.lineTo(Math.floor(node2.x), Math.floor(node2.y));
      ctx.stroke();
    }
    
    // Draw standard glow effect (reduced opacity)
    ctx.strokeStyle = isDarkMode ? config.connectionColorDark : config.connectionColor;
    ctx.globalAlpha = (connectionStrength * opacity) * 0.2;
    ctx.lineWidth = lineWidth + 1;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(Math.floor(node1.x), Math.floor(node1.y));
    ctx.lineTo(Math.floor(node2.x), Math.floor(node2.y));
    ctx.stroke();
    
    // Draw main connection line
    ctx.globalAlpha = connectionStrength * opacity;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(Math.floor(node1.x), Math.floor(node1.y));
    ctx.lineTo(Math.floor(node2.x), Math.floor(node2.y));
    ctx.stroke();
    
    ctx.globalAlpha = 1;
    ctx.lineCap = 'butt';
  }
}

interface AnimationOptions extends Partial<NetworkConfig> {
  isDarkMode?: boolean;
}

class TruthExchangeNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nodes: KnowledgeNode[] = [];
  private animationId: number | null = null;
  private lastTime: number = 0;
  private particleCount: number = config.particleCount;
  private maxDistance: number = config.maxConnectionDistance;
  private isDarkMode: boolean = false;
  private globalNetworkPulse: number = 0;
  private connectionHysteresis: number = 20; // Distance buffer for maintaining connections
  private networkConfig: Partial<NetworkConfig> = {};

  constructor(canvas: HTMLCanvasElement, options: AnimationOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get 2D context from canvas');
    }
    this.ctx = context;
    
    // Merge configurations
    this.networkConfig = { ...config, ...options };
    this.particleCount = this.networkConfig.particleCount || config.particleCount;
    this.maxDistance = this.networkConfig.maxConnectionDistance || config.maxConnectionDistance;
    this.isDarkMode = options.isDarkMode || false;
    
    this.setupCanvas();
    this.initializeNodes();
    this.bindEvents();
  }
  
  private resizeTimeoutId: number | null = null;
  
  private resizeHandler = () => {
    // Throttle resize events to prevent excessive re-renders
    if (this.resizeTimeoutId) {
      clearTimeout(this.resizeTimeoutId);
    }
    
    this.resizeTimeoutId = window.setTimeout(() => {
      const rect = this.canvas.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Set CSS size first
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      
      // Set actual canvas size (for high DPI displays)
      this.canvas.width = rect.width * devicePixelRatio;
      this.canvas.height = rect.height * devicePixelRatio;
      
      // Scale context for device pixel ratio
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // Update responsive settings and reinitialize nodes
      this.updateResponsiveSettings();
      
      // Force a redraw with CSS dimensions
      if (this.animationId !== null) {
        this.ctx.clearRect(0, 0, rect.width, rect.height);
      }
      
      this.resizeTimeoutId = null;
    }, 16); // ~60fps throttling
  };

  private setupCanvas(): void {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }
  
  private updateResponsiveSettings(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width; // Use CSS width, not canvas.width
    
    // Use networkConfig settings if available, otherwise fall back to base config
    const mobileSettings = this.networkConfig.mobile || config.mobile;
    const tabletSettings = this.networkConfig.tablet || config.tablet;
    const desktopSettings = this.networkConfig.desktop || config.desktop;
    
    if (width < 768) {
      this.particleCount = mobileSettings.particleCount;
      this.maxDistance = mobileSettings.maxDistance;
    } else if (width < 1024) {
      this.particleCount = tabletSettings.particleCount;
      this.maxDistance = tabletSettings.maxDistance;
    } else if (width < 1440) {
      this.particleCount = desktopSettings.particleCount;
      this.maxDistance = desktopSettings.maxDistance;
    } else {
      // Wide screens (1440px+): reduce nodes by 50%
      this.particleCount = Math.floor(desktopSettings.particleCount * 0.5);
      this.maxDistance = desktopSettings.maxDistance;
    }
    
    this.initializeNodes();
  }
  
  private initializeNodes(): void {
    this.nodes = [];
    const rect = this.canvas.getBoundingClientRect();
    const canvasWidth = rect.width; // Use CSS width
    const canvasHeight = rect.height; // Use CSS height
    
    for (let i = 0; i < this.particleCount; i++) {
      let x, y;
      if (i === 0) {
        // Create central node at canvas center
        x = canvasWidth / 2;
        y = canvasHeight / 2;
      } else {
        x = Math.random() * canvasWidth;
        y = Math.random() * canvasHeight;
      }
      this.nodes.push(new KnowledgeNode(x, y, i));
    }
  }
  
  private bindEvents(): void {
    // Optional: Add interaction events here
  }
  
  private animate = (currentTime: number): void => {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.globalNetworkPulse += 0.02;
    
    const rect = this.canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    
    // Create subtle earth-tone "rich soil" background
    if (this.isDarkMode) {
      // Dark mode: Deep earth tones with low opacity
      const darkSoilGradient = this.ctx.createLinearGradient(0, 0, 0, canvasHeight);
      darkSoilGradient.addColorStop(0, 'rgba(120, 113, 108, 0.2)'); // stone-500 with opacity
      darkSoilGradient.addColorStop(1, 'rgba(87, 83, 74, 0.3)');    // stone-600 with opacity
      this.ctx.fillStyle = darkSoilGradient;
    } else {
      // Light mode: Warm stone/soil tones with low opacity
      const lightSoilGradient = this.ctx.createLinearGradient(0, 0, 0, canvasHeight);
      lightSoilGradient.addColorStop(0, 'rgba(120, 113, 108, 0.15)'); // stone-500 with opacity
      lightSoilGradient.addColorStop(1, 'rgba(87, 83, 74, 0.25)');    // stone-600 with opacity
      this.ctx.fillStyle = lightSoilGradient;
    }
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Update connections based on distance and memory
    this.updateConnections();
    
    for (const node of this.nodes) {
      node.update(deltaTime, canvasWidth, canvasHeight, this.nodes, this.networkConfig);
    }
    
    // Draw connections only for connected nodes
    for (const node of this.nodes) {
      for (const connectedId of node.connections) {
        const connectedNode = this.nodes.find(n => n.id === connectedId);
        if (connectedNode && connectedId > node.id) { // Avoid drawing twice
          ConnectionRenderer.drawConnection(
            this.ctx, 
            node, 
            connectedNode, 
            this.networkConfig.connectionOpacity || config.connectionOpacity,
            this.isDarkMode,
            this.networkConfig
          );
        }
      }
    }
    
    for (const node of this.nodes) {
      node.draw(this.ctx, this.globalNetworkPulse, this.networkConfig);
    }
    
    this.animationId = requestAnimationFrame(this.animate);
  };
  
  private updateConnections(): void {
    // Clear existing connections
    for (const node of this.nodes) {
      node.connections.clear();
    }
    
    // Rebuild connections with hysteresis and memory
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const node1 = this.nodes[i];
        const node2 = this.nodes[j];
        const distance = node1.distanceTo(node2);
        
        const wasConnected = node1.connectionMemory.has(node2.id);
        const connectionThreshold = wasConnected ? 
          this.maxDistance + this.connectionHysteresis : 
          this.maxDistance;
        
        if (distance <= connectionThreshold && 
            node1.connections.size < 5 && 
            node2.connections.size < 5) {
          
          const strength = Math.max(0.3, 1 - distance / this.maxDistance);
          node1.addConnection(node2.id, strength);
          node2.addConnection(node1.id, strength);
          
          // Strengthen connection over time if it persists
          if (wasConnected) {
            node1.strengthenConnection(node2.id, 0.01);
            node2.strengthenConnection(node1.id, 0.01);
          }
        }
      }
    }
  }
  
  public start(): void {
    if (this.animationId !== null) return;
    this.lastTime = performance.now();
    this.animate(this.lastTime);
  }
  
  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  public setDarkMode(isDark: boolean): void {
    this.isDarkMode = isDark;
  }
  
  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.resizeHandler);
    if (this.resizeTimeoutId) {
      clearTimeout(this.resizeTimeoutId);
      this.resizeTimeoutId = null;
    }
  }
  
  public getNetworkStats(): { totalConnections: number; averageConnections: number; clusters: number } {
    const totalConnections = this.nodes.reduce((sum, node) => sum + node.connections.size, 0) / 2;
    const averageConnections = totalConnections / this.nodes.length;
    
    // Simple cluster detection (connected components)
    const visited = new Set<number>();
    let clusters = 0;
    
    for (const node of this.nodes) {
      if (!visited.has(node.id)) {
        this.dfsCluster(node, visited);
        clusters++;
      }
    }
    
    return { totalConnections, averageConnections, clusters };
  }
  
  private dfsCluster(node: KnowledgeNode, visited: Set<number>): void {
    visited.add(node.id);
    for (const connectedId of node.connections) {
      if (!visited.has(connectedId)) {
        const connectedNode = this.nodes.find(n => n.id === connectedId);
        if (connectedNode) {
          this.dfsCluster(connectedNode, visited);
        }
      }
    }
  }
}

interface TruthExchangeNetworkProps extends Partial<NetworkConfig> {
  className?: string;
  isDarkMode?: boolean;
}

export default function TruthExchangeNetworkComponent({
  className = '',
  isDarkMode = false,
  ...networkOptions
}: TruthExchangeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<TruthExchangeNetwork | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize network options to prevent unnecessary re-renders
  const memoizedNetworkOptions = useMemo(() => {
    return networkOptions;
  }, [
    networkOptions.particleCount,
    networkOptions.particleSize,
    networkOptions.maxConnectionDistance,
    networkOptions.baseSpeed,
    networkOptions.pulseStrength,
    networkOptions.connectionOpacity,
    networkOptions.networkGrowthRate,
    networkOptions.connectionPersistence,
    networkOptions.centralGravity,
    networkOptions.connectionGlow,
    networkOptions.nodeHierarchy,
    networkOptions.colorEvolution,
    networkOptions.focusedClustering,
    networkOptions.businessTheme,
    networkOptions.mobile?.particleCount,
    networkOptions.mobile?.maxDistance,
    networkOptions.tablet?.particleCount,
    networkOptions.tablet?.maxDistance,
    networkOptions.desktop?.particleCount,
    networkOptions.desktop?.maxDistance
  ]);

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    observer.observe(canvasRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    const options: AnimationOptions = {
      isDarkMode,
      ...memoizedNetworkOptions
    };

    animationRef.current = new TruthExchangeNetwork(canvasRef.current, options);
    animationRef.current.start();
    setIsLoaded(true);

    return () => {
      animationRef.current?.destroy();
    };
  }, [isDarkMode, memoizedNetworkOptions, isVisible]);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.setDarkMode(isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      aria-hidden="true"
      role="img"
      aria-label="Animated knowledge network visualization"
    />
  );
}