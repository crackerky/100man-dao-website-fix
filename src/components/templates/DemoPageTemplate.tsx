import BackgroundAnimation from '../atoms/BackgroundAnimation'
import Typography from '../atoms/Typography'

interface DemoPageTemplateProps {
  title?: string
  subtitle?: string
  backgroundOpacity?: number
}

export default function DemoPageTemplate({ 
  title = "100 Man DAO", 
  subtitle = "Unity from Diversity",
  backgroundOpacity = 0.3 
}: DemoPageTemplateProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Background Animation */}
      <BackgroundAnimation opacity={backgroundOpacity} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <Typography variant="h2" className="text-white font-bold">
              {title}
            </Typography>
          </div>
        </header>
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Typography 
              variant="h1" 
              className="text-5xl font-bold text-white mb-6"
              gradient
              isAnimated
              animationDelay={0.2}
            >
              {subtitle}
            </Typography>
            <Typography 
              variant="large" 
              className="text-xl text-white/80 mb-8 leading-relaxed"
              isAnimated
              animationDelay={0.4}
            >
              Experience the harmonious convergence of technology and vision. 
              Watch as scattered possibilities unite into perfect unity.
            </Typography>
            <Typography 
              variant="p"
              className="text-white/60 mb-8 max-w-2xl mx-auto"
              isAnimated
              animationDelay={0.6}
            >
              Scroll down to witness the beautiful transformation from chaos to harmony, 
              as individual lines find their purpose and converge into a perfect circle, 
              finally expanding into infinite ripples of possibility.
            </Typography>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              Begin the Journey
            </button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <Typography 
              variant="h2" 
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              The Philosophy of Unity
            </Typography>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Scattered Beginnings",
                  description: "Every great unity starts with individual elements, scattered and searching for purpose."
                },
                {
                  title: "Convergent Forces", 
                  description: "Through natural attraction and shared vision, separate parts find their way toward each other."
                },
                {
                  title: "Perfect Harmony",
                  description: "When aligned with common purpose, individual elements form something greater than their sum."
                },
                {
                  title: "Infinite Ripples",
                  description: "True unity doesn't end in completion—it expands outward, creating waves of possibility."
                },
                {
                  title: "Collective Power",
                  description: "The strength of the whole emerges from the willing participation of each part."
                },
                {
                  title: "Eternal Cycles",
                  description: "Unity and expansion, gathering and dispersing—the eternal dance of creation."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Typography variant="h3" className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </Typography>
                  <Typography variant="p" className="text-white/70">
                    {item.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Scroll Guide Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="text-3xl font-bold text-white mb-8">
              Experience the Transformation
            </Typography>
            <div className="space-y-6 text-white/80">
              <Typography variant="p">
                The background animation you see responds to your scroll position, 
                creating a living story of unity and harmony.
              </Typography>
              <Typography variant="p">
                As you scroll down, witness the complete transformation: 
                from scattered lines seeking purpose, to convergent forces finding unity, 
                to perfect circles achieving harmony, and finally to infinite ripples 
                spreading possibility throughout the universe.
              </Typography>
              <Typography variant="p" className="text-white/60">
                This is more than animation—it's a meditation on the power of collective action 
                and the beauty that emerges when diverse elements work together toward a common vision.
              </Typography>
            </div>
          </div>
        </section>
        
        {/* Spacer for scroll animation */}
        <div className="h-screen flex items-center justify-center">
          <Typography variant="large" className="text-white/30 text-center">
            Continue scrolling to see the full transformation...
          </Typography>
        </div>
        
        <div className="h-screen flex items-center justify-center">
          <Typography variant="large" className="text-white/30 text-center">
            Watch as lines converge toward unity...
          </Typography>
        </div>
        
        <div className="h-screen flex items-center justify-center">
          <Typography variant="large" className="text-white/30 text-center">
            The perfect circle emerges...
          </Typography>
        </div>
        
        <div className="h-screen flex items-center justify-center">
          <Typography variant="large" className="text-white/30 text-center">
            Infinite ripples of possibility...
          </Typography>
        </div>
        
        {/* Footer */}
        <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-white/10 py-8">
          <div className="container mx-auto px-6 text-center">
            <Typography variant="p" className="text-white/60">
              © 2024 100 Man DAO. All rights reserved.
            </Typography>
            <Typography variant="small" className="text-white/40 mt-2">
              Background animation powered by framer-motion and sacred geometry
            </Typography>
          </div>
        </footer>
      </div>
    </div>
  )
}