'use client';

import { Card, CardContent } from "@/components/ui/card";

interface FarmLandscapeCardProps {
  title: string;
  description: string;
  imagePath: string;
  altText: string;
  metaphor: string;
}

export default function FarmLandscapeCard({
  title,
  description,
  imagePath,
  altText,
  metaphor
}: FarmLandscapeCardProps) {
  return (
    <Card 
      className="farm-landscape-card border-4 border-stone-800 dark:border-stone-600 shadow-lg bg-white dark:bg-stone-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 min-h-[400px]"
      role="img"
      aria-label={`${title}: ${altText}`}
    >
      <CardContent className="p-0">
        <div className="farm-landscape-image-container">
          <img
            src={imagePath}
            alt={altText}
            className="farm-landscape-image w-full h-[300px] object-cover border-b-4 border-stone-800 dark:border-stone-600"
            style={{
              imageRendering: 'pixelated',
            }}
            loading="lazy"
          />
        </div>
        <div className="farm-card-content p-6 bg-rgba(255, 255, 255, 0.95) dark:bg-stone-700">
          <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-3 transition-colors duration-300">
            {title}
          </h4>
          <p className="text-base text-stone-600 dark:text-stone-400 transition-colors duration-300 leading-relaxed mb-3">
            {description}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-500 italic" aria-label={`Farming metaphor: ${metaphor}`}>
            &quot;{metaphor}&quot;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}