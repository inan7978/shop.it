function PrivacyPolicy() {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto">
      <h1 className="font-bold my-10 text-2xl underline">Privacy Policy</h1>
      <div className="w-4/5 sm:w-1/2">
        <p className="font-medium">
          This website exists to demonstrate my ability to build a fully
          functioning web app. All information goes into MongoDB and an AWS S3
          bucket purely to let you interact and fully experience this app. No
          data is ever sold, and if you would like me to scrub any data you may
          have entered, please reach out to me by clicking the "Contact Us" link
          in the footer.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
