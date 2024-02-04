import linkIcon from "../../public/linkIcon.svg";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">About</h1>
      </header>
      <hr className="my-5" />
      <section className="my-12 flex flex-col  gap-2 items-center">
        <img
          src={"https://avatars.githubusercontent.com/u/120288440?v=4"}
          width={"180"}
          height={"180"}
          className="rounded-full"
          alt="profile image"
        />
        <h3 className="text-xl font-bold">1eecan</h3>
        <p>Web FrontEnd Engineer</p>
        <p>South Korea</p>
      </section>
      <section>
        <h1 className="text-4xl font-bold">Link</h1>
        <hr className="my-5" />
        <ul>
          <li>
            <a
              href="https://github.com/1eecan"
              className="flex underline hover:text-white"
            >
              Github
              <Image src={linkIcon} alt="github link" />
            </a>
          </li>
          <li>
            <a
              href="https://dear-industry-95c.notion.site/Chan-Lee-e7edd44b31c14433838ead3ea37aa0a9?pvs=4"
              className="flex underline hover:text-white"
            >
              Resume (Notion)
              <Image src={linkIcon} alt="notion resume link" />
            </a>
          </li>
          <li>
            <a
              href="mailto:busyx2modernsociety@gmail.com"
              className="flex underline hover:text-white"
            >
              Email
              <Image src={linkIcon} alt="e-mail" />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
