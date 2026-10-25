import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTAProps {
  primary?: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function CTA({ primary = false, href, children, className = '' }: CTAProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all";
  
  if (primary) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={href}
          className={`${baseClasses} gradient-neon text-white hover:opacity-90 ${className}`}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className={`${baseClasses} border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
