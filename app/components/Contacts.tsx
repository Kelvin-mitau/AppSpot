import React from "react";
import "../styles/Contact-options.css"

function Contacts() {
  const contacts = {
    email: "kelvinmitau05@gmail.com",
    phoneNumber: "+254780906340",
    facebookLink: "https://www.facebook.com/profile.php?id=61557098195641",
    xLink: "https://x.com/kelvin_mitau",
    linkeedInLink: "https://www.linkedin.com/in/kelvin-mitau-3223992a0/",
  };
  return (
    <div className="Contact-options-div my-auto mx-auto grid place-content-center h-full pt-10 pb-20">
      <div className="flex flex-row gap-12 sm:gap-20 ">
        <div className="Contacct-link-icon">
          <a href={`mailto:${contacts.email}`} target="_blank">
            <svg
              className="w-6 sm:w-10 aspect-square"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
        <div className="Contacct-link-icon">
          <a href={`https://wa.me/${contacts.phoneNumber}`} target="_blank">
            <svg
              className="w-6 sm:w-10 aspect-square"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              />
            </svg>
          </a>
        </div>

        <div className="Contacct-link-icon">
          <a href={contacts.facebookLink} target="_blank">
            <svg
              className="w-6 sm:w-10 aspect-square"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>

        <div className="Contacct-link-icon">
          <a href={contacts.xLink} target="_blank">
            <svg
              className="w-6 sm:w-10 aspect-square"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 512 512"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <div className="Contacct-link-icon">
          <a href={contacts.linkeedInLink} target="_blank">
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-6 sm:w-10 aspect-square"
            >
              <path
                d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 
            448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3
             94 0 111.3 61.9 111.3 142.3V448z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
