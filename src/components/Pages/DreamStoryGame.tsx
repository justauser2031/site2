import React, { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Stars, BookOpen, Play, Pause, RotateCcw, Volume2, VolumeX, ChevronRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface DreamStoryGameProps {
  onBack: () => void;
}

interface StoryChoice {
  id: string;
  text: string;
  nextScene: string;
}

interface StoryScene {
  id: string;
  title: string;
  text: string;
  choices?: StoryChoice[];
  isEnding?: boolean;
  backgroundMusic?: string;
  ambientSound?: string;
}

const DreamStoryGame: React.FC<DreamStoryGameProps> = ({ onBack }) => {
  const { isDark } = useTheme();
  const [currentScene, setCurrentScene] = useState<string>('start');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [storyProgress, setStoryProgress] = useState<string[]>(['start']);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('forest');

  const storyThemes = {
    forest: {
      name: 'Floresta Mágica',
      emoji: '🌲',
      color: 'from-green-600 to-emerald-800',
      description: 'Uma jornada através de uma floresta encantada'
    },
    ocean: {
      name: 'Oceano Profundo',
      emoji: '🌊',
      color: 'from-blue-600 to-cyan-800',
      description: 'Explore as profundezas misteriosas do oceano'
    },
    space: {
      name: 'Viagem Espacial',
      emoji: '🚀',
      color: 'from-purple-600 to-indigo-800',
      description: 'Uma aventura pelas estrelas e planetas distantes'
    },
    mountain: {
      name: 'Montanha Serena',
      emoji: '⛰️',
      color: 'from-gray-600 to-slate-800',
      description: 'Escalada tranquila por montanhas nevadas'
    }
  };

  const stories: Record<string, Record<string, StoryScene>> = {
    forest: {
      start: {
        id: 'start',
        title: 'A Entrada da Floresta',
        text: 'Você se encontra na borda de uma floresta mágica. As árvores antigas sussurram segredos ao vento, e uma luz dourada filtra através das folhas. Um caminho se divide à sua frente.',
        choices: [
          { id: '1', text: 'Seguir o caminho iluminado pela lua', nextScene: 'moonpath' },
          { id: '2', text: 'Explorar a trilha coberta de flores', nextScene: 'flowerpath' },
          { id: '3', text: 'Descansar sob a grande árvore', nextScene: 'bigtree' }
        ]
      },
      moonpath: {
        id: 'moonpath',
        title: 'O Caminho Lunar',
        text: 'O caminho banhado pela luz da lua leva você a uma clareira onde criaturas mágicas dançam em círculos. Elas te convidam para se juntar à dança dos sonhos.',
        choices: [
          { id: '1', text: 'Dançar com as criaturas mágicas', nextScene: 'dance' },
          { id: '2', text: 'Observar silenciosamente', nextScene: 'observe' }
        ]
      },
      flowerpath: {
        id: 'flowerpath',
        title: 'O Jardim dos Sonhos',
        text: 'A trilha de flores te leva a um jardim onde cada flor tem uma cor diferente e emite uma melodia suave. No centro, há uma fonte cristalina que reflete as estrelas.',
        choices: [
          { id: '1', text: 'Beber da fonte mágica', nextScene: 'fountain' },
          { id: '2', text: 'Colher uma flor musical', nextScene: 'flower' }
        ]
      },
      bigtree: {
        id: 'bigtree',
        title: 'A Árvore da Sabedoria',
        text: 'Você se acomoda sob a grande árvore ancestral. Suas raízes formam um assento confortável, e você sente uma paz profunda. A árvore começa a compartilhar histórias antigas através do vento.',
        choices: [
          { id: '1', text: 'Escutar as histórias da árvore', nextScene: 'stories' },
          { id: '2', text: 'Adormecer tranquilamente', nextScene: 'sleep' }
        ]
      },
      dance: {
        id: 'dance',
        title: 'A Dança dos Sonhos',
        text: 'Você se junta à dança mágica, e cada movimento te leva mais fundo em um estado de relaxamento. As criaturas te ensinam os passos dos sonhos lucidos, e você sente seu corpo ficando leve como uma pluma.',
        isEnding: true
      },
      observe: {
        id: 'observe',
        title: 'O Observador Silencioso',
        text: 'Você observa a dança em silêncio, absorvendo a energia mágica. Gradualmente, você sente seus olhos ficando pesados, e a música das criaturas te embala em um sono profundo e reparador.',
        isEnding: true
      },
      fountain: {
        id: 'fountain',
        title: 'A Fonte da Tranquilidade',
        text: 'A água cristalina da fonte tem um sabor doce e refrescante. Imediatamente, você sente uma calma profunda se espalhando por todo seu corpo, e seus pensamentos se tornam claros e serenos.',
        isEnding: true
      },
      flower: {
        id: 'flower',
        title: 'A Melodia do Sono',
        text: 'Você colhe uma flor que emite uma melodia suave e hipnotizante. A música flui através de você, relaxando cada músculo e acalmando sua mente até que você desliza suavemente para o sono.',
        isEnding: true
      },
      stories: {
        id: 'stories',
        title: 'Contos Ancestrais',
        text: 'A árvore conta histórias de eras passadas, de heróis que encontraram paz, de aventuras que terminaram em descanso merecido. Cada palavra ressoa em seu coração, trazendo uma sensação de completude.',
        isEnding: true
      },
      sleep: {
        id: 'sleep',
        title: 'O Sono Profundo',
        text: 'Você se acomoda contra a árvore e fecha os olhos. O som suave das folhas, o aroma da floresta e a energia protetora da árvore te envolvem em um sono profundo e restaurador.',
        isEnding: true
      }
    },
    ocean: {
      start: {
        id: 'start',
        title: 'À Beira do Oceano',
        text: 'Você está em uma praia serena ao entardecer. As ondas sussurram melodias antigas, e o horizonte se pinta com cores suaves. Uma brisa morna acaricia seu rosto.',
        choices: [
          { id: '1', text: 'Caminhar pela areia dourada', nextScene: 'beach' },
          { id: '2', text: 'Entrar nas águas mornas', nextScene: 'water' },
          { id: '3', text: 'Deitar na areia e observar as estrelas', nextScene: 'stars' }
        ]
      },
      beach: {
        id: 'beach',
        title: 'Caminhada Serena',
        text: 'Seus pés afundam suavemente na areia morna. Cada passo sincroniza com o ritmo das ondas, criando uma meditação em movimento. Conchas brilhantes marcam seu caminho.',
        isEnding: true
      },
      water: {
        id: 'water',
        title: 'Abraço do Oceano',
        text: 'A água morna te envolve como um abraço maternal. Você flutua suavemente, sentindo o movimento rítmico das ondas. O oceano te embala em uma sensação de segurança absoluta.',
        isEnding: true
      },
      stars: {
        id: 'stars',
        title: 'Sob o Manto Estrelado',
        text: 'Deitado na areia macia, você contempla o céu estrelado. Cada estrela parece piscar em harmonia com sua respiração, e você sente uma conexão profunda com o universo.',
        isEnding: true
      }
    },
    space: {
      start: {
        id: 'start',
        title: 'A Estação Espacial',
        text: 'Você flutua suavemente em uma estação espacial com vista para a Terra. O planeta azul gira lentamente abaixo, e as estrelas brilham como diamantes no vazio silencioso.',
        choices: [
          { id: '1', text: 'Observar a Terra girando', nextScene: 'earth' },
          { id: '2', text: 'Explorar a nebulosa colorida', nextScene: 'nebula' },
          { id: '3', text: 'Meditar no silêncio do espaço', nextScene: 'meditation' }
        ]
      },
      earth: {
        id: 'earth',
        title: 'Contemplação Terrestre',
        text: 'Você observa a Terra em toda sua beleza. As nuvens dançam sobre os continentes, e a aurora boreal pinta o céu com cores mágicas. Uma sensação de paz universal te envolve.',
        isEnding: true
      },
      nebula: {
        id: 'nebula',
        title: 'Dança das Cores Cósmicas',
        text: 'Você navega através de uma nebulosa de cores vibrantes. Roxos, azuis e dourados se misturam em padrões hipnotizantes, criando uma sinfonia visual que acalma sua alma.',
        isEnding: true
      },
      meditation: {
        id: 'meditation',
        title: 'Silêncio Cósmico',
        text: 'No silêncio absoluto do espaço, você encontra uma paz profunda. Sem som, sem gravidade, apenas você e a vastidão do universo. Sua mente se aquieta completamente.',
        isEnding: true
      }
    },
    mountain: {
      start: {
        id: 'start',
        title: 'O Pico Sereno',
        text: 'Você está no topo de uma montanha coberta de neve. O ar é puro e cristalino, e um silêncio majestoso envolve tudo. O vale se estende abaixo como um mar de nuvens.',
        choices: [
          { id: '1', text: 'Meditar no silêncio da montanha', nextScene: 'meditation' },
          { id: '2', text: 'Observar o nascer do sol', nextScene: 'sunrise' },
          { id: '3', text: 'Encontrar uma caverna acolhedora', nextScene: 'cave' }
        ]
      },
      meditation: {
        id: 'meditation',
        title: 'Meditação no Pico',
        text: 'Sentado em posição de lótus, você respira o ar puro da montanha. Cada inspiração traz clareza, cada expiração libera tensão. Você se torna um com a serenidade da montanha.',
        isEnding: true
      },
      sunrise: {
        id: 'sunrise',
        title: 'O Despertar Dourado',
        text: 'O sol nasce lentamente, pintando a neve com tons dourados e rosados. A luz morna toca seu rosto, e você sente uma renovação profunda. É um novo começo cheio de paz.',
        isEnding: true
      },
      cave: {
        id: 'cave',
        title: 'Refúgio Acolhedor',
        text: 'Você encontra uma caverna natural forrada com cristais que emitem uma luz suave. O espaço é aquecido por uma fonte termal, criando o refúgio perfeito para descansar.',
        isEnding: true
      }
    }
  };

  const getCurrentScene = (): StoryScene => {
    return stories[selectedTheme][currentScene] || stories[selectedTheme]['start'];
  };

  const typewriterEffect = (text: string) => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    const scene = getCurrentScene();
    typewriterEffect(scene.text);
  }, [currentScene, selectedTheme]);

  const handleChoice = (choice: StoryChoice) => {
    setCurrentScene(choice.nextScene);
    setStoryProgress(prev => [...prev, choice.nextScene]);
  };

  const restartStory = () => {
    setCurrentScene('start');
    setStoryProgress(['start']);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scene = getCurrentScene();
  const theme = storyThemes[selectedTheme];

  if (!isPlaying) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950' 
          : 'bg-gradient-to-br from-white via-purple-50/80 to-indigo-100/60'
      }`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/95 border-slate-800' 
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Dream Story</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8 max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Moon className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className={`text-2xl lg:text-3xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Histórias Interativas para Dormir
            </h2>
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Escolha sua aventura relaxante e deixe-se levar por uma jornada que te conduzirá 
              suavemente ao sono profundo e reparador.
            </p>
          </div>

          {/* Theme Selection */}
          <div className="mb-8">
            <h3 className={`text-lg font-bold mb-6 text-center transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Escolha sua Aventura
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(storyThemes).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTheme(key)}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    selectedTheme === key
                      ? isDark
                        ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : isDark
                        ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50'
                        : 'bg-white/80 border-gray-200 hover:bg-gray-100/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{themeData.emoji}</div>
                    <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {themeData.name}
                    </h4>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {themeData.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Começar História
            </button>
            <p className={`text-sm mt-4 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Tema selecionado: <span className="text-purple-400 font-medium">{theme.name}</span>
            </p>
          </div>

          {/* Instructions */}
          <div className={`mt-12 p-6 rounded-2xl border transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-900/30 border-slate-800' 
              : 'bg-gray-100/80 border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className={`font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Como Funciona
                </h3>
                <div className={`text-sm space-y-1 transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  <p>• Escolha um tema que mais te atrai</p>
                  <p>• Tome decisões ao longo da história</p>
                  <p>• Deixe-se levar pela narrativa relaxante</p>
                  <p>• Permita que a história te conduza ao sono</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? `bg-gradient-to-br ${theme.color}` 
        : `bg-gradient-to-br from-white via-purple-50/80 to-indigo-100/60`
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(false)}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{theme.emoji}</span>
                <div>
                  <h1 className={`text-lg font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{theme.name}</h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}>{scene.title}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={restartStory}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className={`flex items-center gap-2 mb-2 transition-colors duration-300 ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            <Stars className="w-4 h-4" />
            <span className="text-sm">Progresso da História</span>
          </div>
          <div className={`rounded-full h-2 transition-colors duration-300 ${
            isDark ? 'bg-slate-800' : 'bg-gray-200'
          }`}>
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(storyProgress.length / Object.keys(stories[selectedTheme]).length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Story Scene */}
        <div className={`backdrop-blur-sm rounded-2xl p-8 border mb-8 transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/50 border-slate-800' 
            : 'bg-white/80 border-gray-200 shadow-lg'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {scene.title}
          </h2>
          
          <div className={`text-lg leading-relaxed mb-8 min-h-[120px] transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-6 bg-purple-400 ml-1 animate-pulse" />
            )}
          </div>

          {/* Choices */}
          {!isTyping && scene.choices && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                O que você escolhe fazer?
              </h3>
              {scene.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] group ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 text-white' 
                      : 'bg-white/90 border-gray-200 hover:bg-gray-100/50 text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{choice.text}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ending */}
          {!isTyping && scene.isEnding && (
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors duration-300 ${
                isDark 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-purple-500/20 text-purple-600'
              }`}>
                <Moon className="w-5 h-5" />
                <span className="font-medium">Fim da História</span>
              </div>
              <p className={`text-sm mt-4 transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Agora é hora de fechar os olhos e deixar os sonhos te levarem...
              </p>
              <button
                onClick={restartStory}
                className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                Nova História
              </button>
            </div>
          )}
        </div>

        {/* Ambient Controls */}
        <div className={`backdrop-blur-sm rounded-xl p-6 border transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/30 border-slate-800' 
            : 'bg-white/60 border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className={`w-5 h-5 transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Sons Ambientes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                {isMuted ? 'Silenciado' : 'Ativo'}
              </span>
              <button
                onClick={toggleMute}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isMuted 
                    ? isDark ? 'bg-slate-600' : 'bg-gray-300'
                    : 'bg-purple-500'
                }`}
              >
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    isMuted ? 'translate-x-1' : 'translate-x-7'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamStoryGame;