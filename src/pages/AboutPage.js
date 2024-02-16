function AboutPage() {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto w-11/12 gap-10 my-12">
      <img
        className="about-page-img"
        src={"https://picsum.photos/500"}
        alt="about-page-img"
      />
      {/* <p className="font-medium">
        My name is Inan. Thanks for checking out my little shop! <br />
        In April of 2023 I was at a crossroads with where I wanted to focus my
        career. After a long call with a friend of mine, I signed up for
        Coursera and began the Meta Front-End Development Course. About 7 months
        later, I received my certificate and began to apply what I have learned.
        I am truly amazed at how far I have come. <br />I have created a basic
        color guessing game, a ToDo app, and my ultimate showcase of skill to
        date is the creation of shop.it, a full stack e-commerce site that
        incorporates React.js for the front end, Express.js for the server side,
        MongoDB for the database and record keeping, and AWS S3 for image (file)
        storage. Essentially MERN + AWS S3. I have leveraged all of these and
        incorporated them together to bring an app that allows users to create
        accounts, login, edit their account info, add items to a cart, edit the
        contents of their cart, create listings, edit listings only they have
        created, and more. All of this is persistent and kept track of using
        MongoDB. This project was a blast to work on. I learned a lot and will
        use it as a template/reference sheet for further projects.
      </p> */}
      <p>My name is Inan. Thanks for checking out my little shop!</p>
      <p></p>
    </div>
  );
}

export default AboutPage;
