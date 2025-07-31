# TruthExchange Network Animation Specification

## Overview
A pixelated, earth-toned network particle animation that visualizes knowledge nodes growing into decentralized networks, perfectly aligned with the farming metaphor and 8-bit aesthetic.

## Visual Design Requirements

### Aesthetic Integration
- **8-bit pixelated style** - square particles instead of circles
- **Earth tone palette** - greens (#22c55e, #16a34a), browns (#a3a3a3, #525252), warm grays
- **Farming metaphor visualization** - particles represent seeds of knowledge growing into networks
- **Subtle animation** - slower, more organic movement than original
- **Performance optimized** - smooth on mobile and desktop

### Animation Behavior
- **Organic growth pattern** - particles spawn and gradually form clusters
- **Dynamic connections** - lines appear/disappear based on proximity and "knowledge affinity"
- **Breathing effect** - subtle pulsing to show living knowledge
- **Seasonal cycles** - periodic clustering and dispersal patterns

## Technical Implementation

### Types and Interfaces

```typescript
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
  connections: number[];
}
```

### Configuration

```typescript
const config: NetworkConfig = {
  backgroundColor: '#f5f5f4', // stone-50 (light mode)
  backgroundColorDark: '#1c1917', // stone-909 (dark mode)
  particleColors: ['#22c55e', '#16a34a', '#15803d', '#166534'],
  connectionColor: '#a3a3a3', // stone-400
  connectionColorDark: '#525252', // stone-600
  
  // Particle settings
  particleCount: 80,
  particleSize: 3,
  maxConnectionDistance: 120,
  
  // Animation settings
  baseSpeed: 0.3,
  pulseStrength: 0.2,
  connectionOpacity: 0.4,
  
  // Responsive breakpoints
  mobile: { particleCount: 40, maxDistance: 80 },
  tablet: { particleCount: 60, maxDistance: 100 },
  desktop: { particleCount: 80, maxDistance: 120 }
};
```

### KnowledgeNode Class

```typescript
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
  public connections: number[];
  public age: number;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
    
    // Movement properties
    this.vx = (Math.random() - 0.5) * config.baseSpeed;
    this.vy = (Math.random() - 0.5) * config.baseSpeed;
    this.angle = Math.random() * Math.PI * 2;
    this.angularVelocity = (Math.random() - 0.5) * 0.02;
    
    // Visual properties
    this.size = config.particleSize;
    this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
    this.pulse = Math.random() * Math.PI * 2;
    
    // Knowledge properties
    this.strength = Math.random();
    this.connections = [];
    this.age = 0;
  }
  
  public update(deltaTime: number, canvasWidth: number, canvasHeight: number): void {
    // Organic movement with slight directional bias
    this.angle += this.angularVelocity;
    this.vx += Math.cos(this.angle) * 0.01;
    this.vy += Math.sin(this.angle) * 0.01;
    
    // Apply speed limits
    const maxSpeed = config.baseSpeed;
    this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
    this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Wrap around edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    
    // Update pulse for breathing effect
    this.pulse += 0.05;
    this.age += deltaTime;
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    // Calculate pulsing size
    const pulseSize = this.size + Math.sin(this.pulse) * config.pulseStrength;
    
    // Draw pixelated square
    ctx.fillStyle = this.color;
    ctx.fillRect(
      Math.floor(this.x - pulseSize / 2), 
      Math.floor(this.y - pulseSize / 2), 
      Math.floor(pulseSize), 
      Math.floor(pulseSize)
    );
  }

  public distanceTo(other: KnowledgeNode): number {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + 
      Math.pow(this.y - other.y, 2)
    );
  }
}
```

### Connection Renderer

```typescript
class ConnectionRenderer {
  public static drawConnection(
    ctx: CanvasRenderingContext2D, 
    node1: KnowledgeNode, 
    node2: KnowledgeNode, 
    opacity: number
  ): void {
    const distance = node1.distanceTo(node2);
    
    if (distance > config.maxConnectionDistance) return;
    
    // Calculate connection strength based on distance and node properties
    const strength = (1 - distance / config.maxConnectionDistance) * 
                    Math.min(node1.strength, node2.strength);
    
    // Pixelated dashed line
    ctx.strokeStyle = config.connectionColor;
    ctx.globalAlpha = strength * opacity;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]); // Pixelated dash pattern
    
    ctx.beginPath();
    ctx.moveTo(Math.floor(node1.x), Math.floor(node1.y));
    ctx.lineTo(Math.floor(node2.x), Math.floor(node2.y));
    ctx.stroke();
    
    ctx.setLineDash([]); // Reset dash
    ctx.globalAlpha = 1;
  }
}
```

### Main Animation Class

```typescript
interface AnimationOptions {
  particleCount?: number;
  maxDistance?: number;
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

  constructor(canvas: HTMLCanvasElement, options: AnimationOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get 2D context from canvas');
    }
    this.ctx = context;
    
    this.particleCount = options.particleCount || config.particleCount;
    this.maxDistance = options.maxDistance || config.maxConnectionDistance;
    this.isDarkMode = options.isDarkMode || false;
    
    this.setupCanvas();
    this.initializeNodes();
    this.bindEvents();
  }
  
  private setupCanvas(): void {
    const