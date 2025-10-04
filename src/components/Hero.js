import { useEffect, useState } from "react";
import Heroimg from '../assets/Hero.jpeg';
import { AiOutlineLinkedin, AiOutlineGithub, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';

export default function Hero() {
  const [skills, setSkills] = useState([]);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [editingId, setEditingId] = useState(null); // For editing

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("https://protfolio-backend-25fy.onrender.com/api/skills");
      setSkills(res.data);
      setTimeout(() => setAnimatedSkills(res.data), 100);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdateSkill = async () => {
    if (!name || !level) return alert("Fill all fields!");
    try {
      if (editingId) {
        // Update skill
        const res = await axios.put(`https://protfolio-backend-25fy.onrender.com/api/skills/${editingId}`, { name, level });
        setSkills(skills.map(s => s._id === editingId ? res.data : s));
        setAnimatedSkills(skills.map(s => s._id === editingId ? res.data : s));
        setEditingId(null);
      } else {
        // Create new skill
        const res = await axios.post("https://protfolio-backend-25fy.onrender.com/api/skills", { name, level });
        setSkills([...skills, res.data]);
        setAnimatedSkills([...animatedSkills, res.data]);
      }
      setName('');
      setLevel('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    setName(skill.name);
    setLevel(skill.level);
    setEditingId(skill._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await axios.delete(`https://protfolio-backend-25fy.onrender.com/api/skills/${id}`);
      setSkills(skills.filter(s => s._id !== id));
      setAnimatedSkills(animatedSkills.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const config = {
    subtitle: 'I am an aspiring final year student',
    social: {
      linkedin: 'https://www.linkedin.com/in/karthigai-selvi-a49ab2253/',
      github: 'https://github.com/karthiga-ravi'
    }
  };

  const imageStyle = {
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #692f75',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)'
  };

  return (
    <section className='flex flex-col md:flex-row px-5 py-32 bg-primary justify-center items-center'>
      
      <div className='md:w-1/2 flex flex-col items-start md:pr-10'>
        <h1 className="font-bold text-5xl font-hero-font">
          Hi, I'm <span className="font-bold text-5xl font-hero-font">R</span> Karthiga
        </h1>
        <p className='font-bold text-3xl font-hero-font text-white'>{config.subtitle}</p>

        <div className='flex py-3 mb-5'>
          <a href={config.social.linkedin} className='pr-5 hover:text-white' target="_blank" rel="noreferrer">
            <AiOutlineLinkedin size={32} />
          </a>
          <a href={config.social.github} className='pr-5 hover:text-white' target="_blank" rel="noreferrer">
            <AiOutlineGithub size={32} />
          </a>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold text-dark mb-3 font-hero-font">My Skills</h2>
          
          {skills.map((skill, index) => {
            const width = animatedSkills.find(s => s.name === skill.name)?.level || 0;
            return (
              <div key={index} className="mb-3 w-full relative group">
                <div className="flex justify-between text-dark font-hero-font text-md mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 h-3 mb-2 rounded overflow-hidden">
                  <div
                    className="bg-[#debfe5] h-3 rounded transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
                <div className="flex space-x-2 group-hover:opacity-100 transition-opacity">
                  <AiFillEdit size={20} className="cursor-pointer text-dark hover:text-white" onClick={() => handleEdit(skill)} />
                  <AiFillDelete size={20} className="cursor-pointer text-dark hover:text-white" onClick={() => handleDelete(skill._id)} />
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex flex-col w-full max-w-xs">
            <input
              type="text"
              placeholder="Skill Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="p-2 mb-2 rounded w-full text-black"
            />
            <input
              type="number"
              placeholder="Skill Level (0-100)"
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="p-2 mb-2 rounded w-full text-black"
              min="0"
              max="100"
            />
            <button
              onClick={handleAddOrUpdateSkill}
              className="bg-[#692f75] text-white px-5 py-2 font-bold hover:border-2 border-white rounded"
            >
              {editingId ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </div>
      </div>

      <div className='md:w-1/2 flex justify-center mt-10 md:mt-0'>
        <img className='img' src={Heroimg} alt="Hero" style={imageStyle} />
      </div>

    </section>
  );
}
