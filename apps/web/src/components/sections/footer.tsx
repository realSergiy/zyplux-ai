import { Waves } from 'lucide-react';

export const Footer = () => (
  <footer className='relative py-12 border-t border-border/50 backdrop-blur-lg bg-gradient-to-b from-background via-background to-primary/5'>
    <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50' />
    <div className='container mx-auto px-4 relative z-10'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>
            <Waves className='h-8 w-8 text-primary' />
            <span className='text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
              Totvibe
            </span>
          </div>
          <p className='text-muted-foreground max-w-md'>
            Building the next generation of agentic web systems through advanced cognitive frameworks and neural
            intelligence architectures.
          </p>
        </div>

        <div>
          <h3 className='font-semibold mb-4'>Navigate</h3>
          <ul className='space-y-2'>
            {['Capabilities', 'Architecture', 'Connect'].map(item => (
              <li key={item}>
                <a
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-semibold mb-4'>Resources</h3>
          <ul className='space-y-2'>
            <li className='text-muted-foreground'>Documentation (Coming Soon)</li>
            <li className='text-muted-foreground'>API Reference (Coming Soon)</li>
          </ul>
        </div>
      </div>

      <div className='pt-8 border-t border-border/50 text-center text-sm text-muted-foreground'>
        <p>
          © {new Date().getFullYear()} Totvibe. Powered by autonomous cognitive systems and neural processing
          frameworks.
        </p>
      </div>
    </div>
  </footer>
);
