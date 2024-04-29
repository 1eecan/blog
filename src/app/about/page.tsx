import LinkIcon from "@/_ui/icons/LinkIcon";
export default function About() {
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
          <li className="flex items-center">
            <a
              href="https://github.com/1eecan"
              className="flex underline hover:text-white"
              aria-label="github link"
            >
              Github
            </a>
            <LinkIcon className="hover:text-white" />
          </li>
          <li className="flex items-center">
            <a
              href="https://dear-industry-95c.notion.site/8c1b9310a2e4463696ac47c021d0a5e3?pvs=4"
              className="flex underline hover:text-white"
              aria-label="notion resume link"
            >
              Resume (Notion)
            </a>
            <LinkIcon className="hover:text-white" />
          </li>
          <li className="flex items-center">
            <a
              href="mailto:busyx2modernsociety@gmail.com"
              className="flex underline hover:text-white"
              aria-label="e-mail"
            >
              Email
            </a>
            <LinkIcon className="hover:text-white" />
          </li>
        </ul>
      </section>
    </>
  );
}
