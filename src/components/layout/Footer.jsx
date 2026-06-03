const Footer = () => (
  <footer className="py-5 text-center border-top border-white border-opacity-10" style={{ background: '#050505' }}>
    <div className="container">
      <h3 className="font-playfair gold-gradient-text justify-content-center mb-3">Hotel Hayaath</h3>

      <p className="text-white-50 mb-4" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
        Experience the heritage of royal flavors. We bring the authentic 'Dum'
        tradition to your table with every serving.
      </p>
      <div className="d-flex gap-4 justify-content-center opacity-50 mb-4">
        <a href="#" className="text-white text-decoration-none small">Instagram</a>
        <a href="#" className="text-white text-decoration-none small">Facebook</a>
        <a href="#" className="text-white text-decoration-none small">Twitter</a>
      </div>
      <p className="small text-white-25 m-0">&copy; 2026 Hotel Hayaath. Crafted with Passion.</p>
    </div>
  </footer>
);

export default Footer;
