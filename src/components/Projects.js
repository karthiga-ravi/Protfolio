import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Project = () => {
  const reduxProjects = useSelector(state => state.portfolio.projects); // Redux projects
  const [backendProjects, setBackendProjects] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Fetch backend projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setBackendProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !desc || !link || !name) return alert('Please fill all fields');

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('desc', desc);
    formData.append('link', link);
    formData.append('name', name);

    try {
      const res = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBackendProjects([...backendProjects, res.data]);
      setName('');
      setDesc('');
      setLink('');
      setImageFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Combine Redux + backend projects
  const allProjects = [...reduxProjects, ...backendProjects];

  return (
    <section id="projects" className="flex flex-col py-20 px-5 justify-center bg-primary text-white">
      <h1 className="text-4xl border-b-4 border-[#692f75] mb-8 w-[160px] font-bold">Projects</h1>

      {/* Project List */}
      <div className="flex flex-wrap gap-6 justify-center">
        {allProjects.map((p, idx) => (
          <div 
            key={idx} 
            className="bg-[#7b3a7c] rounded-md overflow-hidden w-full sm:w-[300px] md:w-[400px] hover:scale-105 transition-transform flex flex-col"
          >
            {/* Project Name */}
            {p.name && (
              <h3 className="font-hero-font text-center text-xl font-bold mb-2 mt-2 text-white">{p.name}</h3>
            )}

            {/* Project Image */}
            <div className="w-full overflow-hidden rounded-md">
              <img
                src={
                  typeof p.image === 'string'
                    ? p.image.startsWith('http')
                      ? p.image          // full URL for Redux images
                      : p.image          // local imports
                    : `http://localhost:5000${p.image}` // backend uploaded
                }
                alt={p.name || 'project'}
                className="w-full object-cover rounded-md  "
                style={{ maxHeight: '400px' }}
              />
            </div>

            {/* Project Description */}
            <p className="text-center py-2 flex-grow m-3">{p.desc}</p>

            {/* Project Link */}
            <a 
              href={p.link} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#b56ec3] text-center px-5 py-2 font-bold hover:border-2 border-white rounded mb-3 ml-14 mr-14"
            >
              View Project
            </a>
          </div>
        ))}
      </div>

      {/* Add Project Form */}
      <form onSubmit={handleSubmit} className="flex flex-col mb-10 max-w-md mt-8 self-center">
        <input 
          type="text" 
          placeholder="Project Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="mb-3 p-2 rounded text-black" 
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="w-full object-cover rounded-md mb-2 max-h-64"
          />
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])} 
          className="mb-3 p-2 rounded text-black" 
        />
        <input 
          type="text" 
          placeholder="Project Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          className="mb-3 p-2 rounded text-black" 
        />
        <input 
          type="text" 
          placeholder="Project Link" 
          value={link} 
          onChange={(e) => setLink(e.target.value)} 
          className="mb-3 p-2 rounded text-black" 
        />
        <button 
          type="submit" 
          className="bg-[#692f75] px-4 py-2 rounded px-5 py-2 font-bold hover:border-2 border-white"
        >
          Add Project
        </button>
      </form>

    </section>
  );
};

export default Project;
