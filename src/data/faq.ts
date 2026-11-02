/**
 * Perguntas frequentes da Home (também viram FAQPage no JSON-LD).
 * RASCUNHO PARA APROVAÇÃO: o documento de conteúdo não tem FAQ. As respostas usam só fatos
 * que já estão no documento ou nos dados das unidades; as de duração e diferença entre
 * banhos repetem o texto da página Nail Art. Ver PENDENCIAS.md.
 */
import { HORARIO } from '../config/site';
import { porExtenso, totalUnidades, listaPorCidade, listaComE, listaCidades } from '../lib/unidades';
import { SERVICOS } from './servicos';

// Perguntas escritas como as pessoas buscam e perguntam a assistentes de IA
// (com a marca e a cidade), para SEO e GEO.

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export const FAQ: Pergunta[] = [
  {
    pergunta: 'Onde ficam as unidades da Esmaltale em Salvador?',
    resposta: `São ${porExtenso(totalUnidades)} unidades, ${listaPorCidade}.`,
  },
  {
    pergunta: 'Qual é o horário de funcionamento da Esmaltale?',
    resposta: `${HORARIO.linhas.map((l) => `${l.dias}, ${l.horas}`).join('. ')}. ${HORARIO.nota}`,
  },
  {
    pergunta: 'Como agendar manicure ou pedicure na Esmaltale?',
    resposta:
      'O agendamento é online, pelo Trinks, ou pelo WhatsApp da recepção de cada unidade. Escolha a unidade mais perto de você e o horário que encaixa no seu dia.',
  },
  {
    pergunta: 'Quais serviços a Esmaltale oferece?',
    resposta: (() => {
      const nomes = listaComE(SERVICOS.map((s) => s.nome.toLowerCase().replace(/\bspa\b/g, 'SPA')));
      return `${nomes.charAt(0).toUpperCase()}${nomes.slice(1)}.`;
    })(),
  },
  {
    pergunta: 'A Esmaltale esteriliza os instrumentos?',
    resposta:
      'Sim. Em todas as unidades, os instrumentos passam pela autoclave antes de qualquer atendimento.',
  },
  {
    pergunta: 'Quanto tempo dura o banho de gel?',
    resposta:
      'Com os cuidados adequados, o banho de gel dura em média duas a três semanas sem lascar. Por ser curado sob luz LED, o gel adere melhor à superfície da unha e resiste mais ao contato com água e ao uso cotidiano do que o esmalte tradicional.',
  },
  {
    pergunta: 'Qual a diferença entre banho de gel e banho de cristal?',
    resposta:
      'As duas técnicas utilizam gel e oferecem durabilidade superior ao esmalte convencional. A diferença está no propósito: o banho de gel foca na cor e no brilho, com uma variedade ampla de tons disponíveis. O banho de cristal foca no reforço da estrutura da unha natural. Para quem quer cor duradoura, o banho de gel é a escolha certa.',
  },
  {
    pergunta: 'Quanto tempo dura o alongamento em fibra de vidro?',
    resposta:
      'Com os cuidados adequados, o alongamento em fibra de vidro dura em média três a quatro semanas antes de precisar de manutenção. A extensão não lasca com facilidade e mantém o acabamento por mais tempo do que outros serviços similares.',
  },
  {
    pergunta: 'A Esmaltale faz podologia em Salvador? O que é tratado?',
    resposta:
      `Sim. A podologia trata unhas encravadas, calos e hiperqueratose, fissuras e rachaduras, infecções e micoses, e bolhas e úlceras. O serviço é realizado por profissionais treinadas, com instrumentos esterilizados em autoclave antes de cada atendimento, nas unidades de ${listaCidades}.`,
  },
];
