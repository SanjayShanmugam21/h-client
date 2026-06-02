const ManagePosters = () => {
  return (
    <div>
      <div className="mb-5">
        <h2>Upload Hero Posters</h2>
        <p className="text-white-50">Change the main visuals appearing on the home page hero section.</p>
      </div>

      <div className="admin-card text-center py-5 mb-5" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
        <div style={{ fontSize: '3rem' }} className="mb-3">📁</div>
        <h4>Drag & Drop Gallery Images</h4>
        <p className="text-white-50 mb-4">Recommended Size: 1920x1080 (JPG, PNG)</p>
        <button className="admin-btn admin-btn-primary">Browse Files</button>
      </div>

      <h4 className="mb-4">Current Posters</h4>
      <div className="row g-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="col-md-4">
            <div className="admin-card p-2">
              <div className="rounded-3 overflow-hidden mb-3" style={{ height: '150px', background: '#222' }}>
                <img src={`/images/hero${i}.jpg`} alt="" className="w-100 h-100 object-fit-cover opacity-50" />
              </div>
              <div className="d-flex justify-content-between align-items-center px-2 pb-2">
                <span className="small text-white-50">Poster_{i}.jpg</span>
                <button className="text-danger border-0 bg-transparent p-0">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosters;
