import MultipleChoice from './MultipleChoice.jsx';
import GapFillBank from './GapFillBank.jsx';
import SentenceBuilder from './SentenceBuilder.jsx';
import WordSelect from './WordSelect.jsx';
import MatchPairs from './MatchPairs.jsx';
import WireConnect from './WireConnect.jsx';
import WordGuess from './WordGuess.jsx';
import FactOrFake from './FactOrFake.jsx';
import SortIt from './SortIt.jsx';
import SequenceOrder from './SequenceOrder.jsx';

/*
 * Despacha un reactivo a su componente segun `question.type`.
 */
export default function QuestionRenderer({ question, value, onChange, revealed, disabled, matricula }) {
  const common = { question, value, onChange, revealed, disabled, matricula };
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoice {...common} />;
    case 'gap-fill-bank':
      return <GapFillBank {...common} />;
    case 'sentence-builder':
      return <SentenceBuilder {...common} />;
    case 'word-select':
      return <WordSelect {...common} />;
    case 'match-pairs':
      return <MatchPairs {...common} />;
    case 'wire-connect':
      return <WireConnect {...common} />;
    case 'word-guess':
      return <WordGuess {...common} />;
    case 'fact-or-fake':
      return <FactOrFake {...common} />;
    case 'sort-it':
      return <SortIt {...common} />;
    case 'sequence-order':
      return <SequenceOrder {...common} />;
    default:
      return (
        <p className="text-coral-600">
          Unknown question type: {String(question.type)}
        </p>
      );
  }
}
