import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader';
import { services } from './data/services';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ServicePage from './pages/ServicePage';

export default function App() {
  const [ready, setReady] = useState(false);

  // Safety net: never leave the page hidden if the loader is interrupted.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 4500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={ready ? 'app is-ready' : 'app'}>
      <Loader onDone={() => setReady(true)} />
      <Background />
      <CustomCursor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {services.map((service) => (
            <Route key={service.id} path={service.path} element={<ServicePage service={service} />} />
          ))}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}
