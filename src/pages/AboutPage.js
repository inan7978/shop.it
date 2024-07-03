import logoPic from "../images/shopitLogo.png";

function AboutPage() {
  const bulletStyle = "";
  const pStyles = "my-5";
  return (
    <div className="container flex flex-col justify-center mx-auto w-11/12 max-w-screen-xl gap-10 my-12 p-5">
      <h1 className="text-center text-3xl font-bold hidden">www.ishopit.net</h1>
      <img className="sm:hidden" src={logoPic} />
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row sm:justify-center mx-auto sm:mb-10">
          <div className="text-center sm:w-1/2">
            <h2 className="underline font-medium">Technologies used:</h2>
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
          </div>
          <img className="hidden sm:block sm:w-1/2" src={logoPic} />
        </div>

        <h1 className="font-bold underline">Summary</h1>
        <p className={pStyles}>
          &nbsp; &nbsp; &nbsp; Shop.it was going to originally be called
          “craigslist clone”, but I figured that was too boring and would give
          users the “oh he just copied it poorly” thought. I then chose to call
          it shop.it because it is something unique and it had a nice sound to
          it. I built it without following a guide. I utilized Figma, which is
          an excellent UI design software, and a free logo maker for the logo to
          give this shop.it idea an actual look. After all, you can’t start
          making something if you haven’t made a prototype or sketch of it to
          follow.
        </p>
        <p className={pStyles}>
          &nbsp; &nbsp; &nbsp; I used REACT for the front end and mainly used
          the useState and useEffect hooks. There was plenty of JSX but that
          should go without saying. I used JWT and cookies to store the logged
          in user. I created basic components and a basic website layout along
          with various “pages”. The navigation was handled by react router and I
          used a bit of state passing when navigating to other pages. I
          originally did not use a CSS framework. My idea was to practice my CSS
          skills a bit. I later incorporated the Tailwind CSS framework and I’m
          happy I did so. The vanilla CSS I wrote is still in the source code.
        </p>
        <p className={pStyles}>
          &nbsp; &nbsp; &nbsp; The backend was done with Express and it
          communicates with the front end via API endpoints. This server was a
          basic-ish one that I managed to put together using my ToDo-MERN (can
          be found on my GitHub) backend as a boilerplate. It communicates with
          a MongoDB database and 2 separate collections within that database,
          items and users. Items is where the items that are for sale are kept.
          Each item has various keys including a key for the URL to the
          respective item image. The URL links to the image file in an AWS S3
          bucket I set up to hold the actual images of the items for sale.
        </p>
        <p className={pStyles}>
          &nbsp; &nbsp; &nbsp; I used the AWS-SDK package from NPM to allow
          uploading images directly from the app, allowing users to add items to
          the store intuitively. The users collection is where the information
          about registered users is held. Each user has their own record that
          contains information about them and an array of objects that contain
          the itemIDs to the items in their cart and the quantity of said item.
          When a user logs in, the client sends the inputted email and password
          to the server (in the body of a POST request) which then does a query
          to MongoDB to find a record that has that matching email address. If
          it finds it, and the password is correct, the server sends back a JWT
          that the client then stores in a cookie on the browser.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
