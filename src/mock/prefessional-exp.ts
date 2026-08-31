import { generateUUID } from "../utils/uuid";

export const professionalExps = [
  {
    id: generateUUID(),
    title: "Desenvolvedor Mobile",
    description:
      "Responsável pelo monitoramento de dados e erros da aplicação, identificando falhas, propondo e implementando correções para garantir maior estabilidade e qualidade do produto.",
    company: "Globalsys",
    hire_year: "02/2026",
    layoff_year: "08/2026",
  },
  {
    id: generateUUID(),
    title: "Desenvolvedor Fullstack",
    description:
      "Atuação fullstack (com foco predominante em front-end) em múltiplas aplicações nas áreas de arquitetura, agricultura e agronegócio, incluindo ferramentas de análise de risco e oportunidades territoriais.",
    company: "Lupit",
    hire_year: "12/2021",
    layoff_year: "presente",
  },
  {
    id: generateUUID(),
    title: "Desenvolvedor Mobile",
    description:
      "Desenvolvimento front-end mobile para aplicativos de pagamento, implementando telas completas e integrando-as com serviços de back-end.",
    company: "Freelancer",
    hire_year: "01/2024",
    layoff_year: "12/2024",
  },
];
