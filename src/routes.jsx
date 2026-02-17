import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="contact" element={<Contact />} />
        <Route path="events" element={<Events />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
