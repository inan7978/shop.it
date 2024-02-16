function AboutPage() {
  const bulletStyle = "list-disc";
  return (
    <div className="container flex flex-col justify-center mx-auto w-11/12 gap-10 my-12 p-5">
      <h1>www.ishopit.net</h1>
      <ul>
        <li className={bulletStyle}>React</li>
        <li className={bulletStyle}>Express</li>
        <li className={bulletStyle}>Node.js</li>
        <li className={bulletStyle}>Tailwind CSS</li>
        <li className={bulletStyle}>MongoDB</li>
        <li className={bulletStyle}>AWS S3</li>
        <li className={bulletStyle}>Netlify</li>
        <li className={bulletStyle}>GitHub</li>
        <li className={bulletStyle}>Render</li>
        <li className={bulletStyle}>Figma</li>
        <li className={bulletStyle}>Squarespace</li>
        <li className={bulletStyle}>Postman</li>
      </ul>
      <p></p>
    </div>
  );
}

export default AboutPage;
