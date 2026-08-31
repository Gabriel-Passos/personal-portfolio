import type { Project } from "../types/project.type";

import planejaFacil01 from "../assets/projects/planeja-facil/01.png";
import planejaFacil02 from "../assets/projects/planeja-facil/02.png";
import planejaFacil03 from "../assets/projects/planeja-facil/03.png";
import planejaFacil04 from "../assets/projects/planeja-facil/04.png";
import planejaFacil05 from "../assets/projects/planeja-facil/05.png";
import planejaFacil06 from "../assets/projects/planeja-facil/06.png";
import planejaFacil07 from "../assets/projects/planeja-facil/07.png";
import planejaFacil08 from "../assets/projects/planeja-facil/08.png";

import beTheHero01 from "../assets/projects/be-the-hero/01.png";
import beTheHero02 from "../assets/projects/be-the-hero/02.png";
import beTheHero03 from "../assets/projects/be-the-hero/03.png";

import proffy01 from "../assets/projects/proffy/01.png";
import proffy02 from "../assets/projects/proffy/02.png";

import moveIt01 from "../assets/projects/move-it/01.png";
import moveIt02 from "../assets/projects/move-it/02.png";
import moveIt03 from "../assets/projects/move-it/03.png";
import moveIt04 from "../assets/projects/move-it/04.png";
import moveIt05 from "../assets/projects/move-it/05.png";

export const personalProjects: Project[] = [
  {
    id: "planeja-facil",
    title: "Planeja Fácil",
    year: "2026",
    category: "Produtividade",
    techs: [
      "Node.JS",
      "Nest.JS",
      "React.JS",
      "PostgreSQL",
      "Docker",
      "Claude Code",
      "REST",
    ],
    shortDescription:
      "Aplicação voltada para o gerenciamento financeiro. Registrando receitas e despesas você começa a planejar o seu futuro com o mínimo de surpresas.",
    fullDescription:
      "Planeja Fácil é uma aplicação de gerenciamento financeiro pessoal construída com uma arquitetura full stack moderna. O back-end foi desenvolvido em Node.JS com o framework Nest.JS, seguindo uma estrutura modular e escalável, expondo uma API REST responsável por toda a comunicação com o front-end. Os dados são persistidos em um banco PostgreSQL, e todo o ambiente de desenvolvimento e deploy é containerizado com Docker, garantindo consistência entre diferentes ambientes. O front-end foi construído em React.JS, oferecendo uma interface fluida para o registro de receitas e despesas. O desenvolvimento contou com o apoio do Claude Code como ferramenta de produtividade, auxiliando na escrita, revisão e organização do código ao longo do projeto. O objetivo da aplicação é dar ao usuário uma visão clara da sua vida financeira, ajudando a planejar o futuro com o mínimo de surpresas.",
    gitHubFrontendUrl:
      "https://github.com/Gabriel-Passos/frontend-planeja-facil",
    gitHubBackendUrl: "https://github.com/Gabriel-Passos/backend-planeja-facil",
    image: [
      {
        src: planejaFacil01,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil02,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil03,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil04,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil05,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil06,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil07,
        alt: "Planeja Fácil",
      },
      {
        src: planejaFacil08,
        alt: "Planeja Fácil",
      },
    ],
  },
  {
    id: "be-the-hero",
    title: "Be The Hero",
    year: "2023",
    category: "Solidariedade",
    techs: ["React.JS", "React Native", "Node.JS", "Exrpess.JS"],
    shortDescription:
      "Be The Hero é uma aplicação com objetivo de oferecer as ONGS um meio de encontrar pessoas que queiram ajudar. A aplicação possuí duas frentes que estão consumindo a mesma API. As ONGS deverão utilizar a aplicação web para divulgar seus casos, enquanto os usuários deverão utilizar a aplicação mobile para visulizar os casos em aberto.",
    fullDescription:
      "Be The Hero foi desenvolvido com uma arquitetura de duas frentes consumindo a mesma API REST, construída em Node.JS com Express.JS. O front-end web, feito em React.JS, é utilizado pelas ONGs para cadastrar e divulgar seus casos de forma simples e rápida. Já o aplicativo mobile, desenvolvido em React Native, permite que os usuários naveguem pelos casos em aberto e escolham como ajudar, seja através de doação ou contato direto com a ONG responsável. A centralização das regras de negócio em uma única API garante que as informações estejam sempre sincronizadas entre as duas plataformas.",
    gitHubUrl: "https://github.com/Gabriel-Passos/be-the-hero",
    image: [
      {
        src: beTheHero01,
        alt: "Be The Hero",
      },
      {
        src: beTheHero02,
        alt: "Be The Hero",
      },
      {
        src: beTheHero03,
        alt: "Be The Hero",
      },
    ],
  },
  {
    id: "proffy",
    title: "Proffy",
    year: "2020",
    category: "Educação",
    techs: ["React.JS", "TypeScript"],
    shortDescription:
      "Proffy é uma aplicação voltada para o profissional de educação, aqui o professor poderá dar as suas aulas no dia e horário que preferir, cobrando por hora o preço que desejar.",
    fullDescription:
      "Proffy é uma plataforma web construída com React.JS e TypeScript, unindo professores e alunos em um ambiente simples e intuitivo. A aplicação permite que professores cadastrem suas próprias aulas, definindo dias e horários de disponibilidade, além do valor cobrado por hora, dando total flexibilidade sobre como e quando lecionar. Do lado dos alunos, a plataforma oferece um sistema de busca e filtros para encontrar o professor ideal de acordo com a matéria, disponibilidade e preço desejados. O uso de TypeScript reforça a tipagem estática e a manutenibilidade do código ao longo de todo o projeto.",
    gitHubFrontendUrl: "https://github.com/Gabriel-Passos/proffy-web",
    gitHubBackendUrl: "https://github.com/Gabriel-Passos/proffy-api",
    image: [
      {
        src: proffy01,
        alt: "Proffy",
      },
      {
        src: proffy02,
        alt: "Proffy",
      },
    ],
  },
  {
    id: "move-it",
    title: "Move.it",
    year: "2021",
    category: "Saúde",
    techs: ["React.JS", "React Native", "Node.JS", "Exrpess.JS"],
    shortDescription:
      "Move.it é uma aplicação com gamificação voltada para profissionais que passam longos períodos sentados em frente ao computador. Baseada na técnica Pomodoro, a plataforma incentiva pausas durante o trabalho, oferecendo desafios de exercícios ao final de cada ciclo. Cada desafio possui uma atividade e recompensa o usuário com pontos de experiência, tornando os momentos de descanso mais ativos e divertidos.",
    fullDescription:
      "Move.it combina front-end web em React.JS e aplicativo mobile em React Native, ambos consumindo uma API construída em Node.JS com Express.JS. A aplicação aplica a técnica Pomodoro para incentivar pausas regulares durante o trabalho, disparando desafios de exercícios físicos ao final de cada ciclo de foco. Cada desafio completado recompensa o usuário com pontos de experiência (XP), criando um sistema de gamificação que transforma os momentos de descanso em uma experiência mais engajante, incentivando hábitos mais saudáveis para quem passa longos períodos sentado em frente ao computador.",
    gitHubUrl: "https://github.com/Gabriel-Passos/move.it",
    image: [
      {
        src: moveIt01,
        alt: "Move.it",
      },
      {
        src: moveIt02,
        alt: "Move.it",
      },
      {
        src: moveIt03,
        alt: "Move.it",
      },
      {
        src: moveIt04,
        alt: "Move.it",
      },
      {
        src: moveIt05,
        alt: "Move.it",
      },
    ],
  },
];
