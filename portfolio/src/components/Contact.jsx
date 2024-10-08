import React, { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';


const Contact = () => {

  const formRef = useRef(null);
  const [form, setForm] = useState({name: '', email: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleFocus = () => {
    setCurrentAnimation('walk');
  };

  const handleBlur = () => {
    setCurrentAnimation('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Nat",
        from_email: form.email,
        to_email: 'natrose1483@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: "Message sent successfully!", type: 'success'})
      setCurrentAnimation("hit");

      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle');
        setForm({ name: '', email: '', message: ''});
      }, [3000]);
      // TODO: Show success
      // TODO: Hide alert
      setForm({name:'', email:'', message: ''});
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation("idle");
      console.log(error);
      showAlert({ show: true, text: "Message not received.", type: 'danger'})
      }
    );
  };


  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange} 
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="john@gmail.com"
              required
              value={form.email}
              onChange={handleChange} 
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label >
            Message
            <input
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange} 
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      
      <div >
        <Canvas
          camera={{
            position: [0,0,5],
            fov: 60,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.2} position={[0,0,1]} />
          <ambientLight intensity={0.4} />
          <Suspense >

          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact