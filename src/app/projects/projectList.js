import {
  JavaScript,
  TypeScript,
  Nextjs,
  React,
  ReactQuery,
  ReactRouter,
  TailWindCSS,
  MSW,
  Github,
  Web,
  Npm,
} from "./icons";

const projectList = [
  {
    title: "math-all",
    subTitle: "Provide extended rounding solution in JavaScript",
    techStack: [<JavaScript key="JavaScript" className="w-8 sm:w-12" />],
    servicePage: [
      <Github key="Github" className="w-4 sm:w-5 h-fit" />,
      <Npm key="Npm" className="w-4 sm:w-5 h-fit fill-white" />,
    ],
  },
  {
    title: "pickple",
    subTitle: "Make basketball pick-up game easier",
    techStack: [
      <TypeScript key="TypeScript" className="w-8 sm:w-12" />,
      <React key="React" className="w-8 sm:w-12" />,
      <ReactQuery key="ReactQuery" className="w-8 sm:w-12" />,
      <ReactRouter key="ReactRouter" className="w-8 sm:w-12" />,
      <MSW key="MSW" className="w-8 sm:w-12 h-fit" />,
      "...",
    ],
    servicePage: [
      <Github key="Github" className="w-4 sm:w-5 h-fit" />,
      <Web key="Web" className="w-4 sm:w-5 h-fit" />,
    ],
  },
  {
    title: "blog",
    subTitle: "1eecan's dev blog",
    techStack: [
      <TypeScript key="TypeScript" className="w-8 sm:w-12" />,
      <Nextjs key="Nextjs" className="w-8 sm:w-12" />,
      <TailWindCSS key="TailWindCSS" className="w-8 sm:w-12" />,
    ],
    servicePage: [
      <Github key="Github" className="w-4 sm:w-5 h-fit" />,
      <Npm key="Npm" className="w-4 sm:w-5 h-fit fill-white" />,
      <Web key="Web" className="w-4 sm:w-5 h-fit" />,
    ],
  },
];

export default projectList;
