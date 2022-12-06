import { Navigation } from '../Nav/Nav';
import { Footer } from '../Footer/Footer';

export function Layout({ children }) {
  return (
    <div >
      <Navigation />
      <br/>
        {children}
      <Footer />
    </div>
  )
}