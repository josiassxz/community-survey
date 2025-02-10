import React from 'react';
import { 
  Stethoscope, 
  Scale, 
  Calculator, 
  Pencil, 
  BookOpen, 
  Atom, 
  Code, 
  Building, 
  Heart,
  Dna,
  Pill,
  Music,
  Camera,
  Bird
} from 'lucide-react';

const FloatingIcons = () => {
  const professions = [
    { Icon: Stethoscope, color: '#FF6B6B', title: 'Medicina' },
    { Icon: Scale, color: '#4ECDC4', title: 'Direito' },
    { Icon: Calculator, color: '#45B7D1', title: 'Engenharia' },
    { Icon: Pencil, color: '#96CEB4', title: 'Artes' },
    { Icon: BookOpen, color: '#FFEEAD', title: 'Educação' },
    { Icon: Atom, color: '#D4A5A5', title: 'Física' },
    { Icon: Code, color: '#9B59B6', title: 'Computação' },
    { Icon: Building, color: '#3498DB', title: 'Arquitetura' },
    { Icon: Heart, color: '#E74C3C', title: 'Enfermagem' },
    { Icon: Dna, color: '#2ECC71', title: 'Biomedicina' },
    { Icon: Pill, color: '#F1C40F', title: 'Farmácia' },
    { Icon: Music, color: '#E67E22', title: 'Música' },
    { Icon: Camera, color: '#1ABC9C', title: 'Cinema' },
    { Icon: Bird, color: '#34495E', title: 'Veterinária' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ marginTop: '-100vh' }}>
      {professions.map((prof, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${5 + Math.random() * 80}%`,
            animation: `float-${index} ${25 + Math.random() * 15}s linear infinite`,
            animationDelay: `${-Math.random() * 12}s`,
            top: '0'
          }}
        >
          <prof.Icon
            size={32}
            color={prof.color}
            className="transform rotate-12 opacity-20 hover:opacity-60 transition-opacity"
          />
          <style jsx>{`
            @keyframes float-${index} {
              0% {
                transform: translateY(0) rotate(0deg);
              }
              100% {
                transform: translateY(200vh) rotate(360deg);
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;