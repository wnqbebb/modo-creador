import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ArrowRight } from 'lucide-react'

// Reusable high-quality Copy Button with Framer Motion
function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''}`}>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="done" initial={{opacity:0, y:3}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="flex items-center gap-1.5">
            <Check size={15}/> Copiado
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{opacity:0}} animate={{opacity:1}} className="flex items-center gap-1.5">
            <Copy size={15}/> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function ToolOption({ logo, name, desc, features, prompt }: any) {
  return (
    <div className="premium-card p-7 flex flex-col">
      <div className="flex gap-4 items-center mb-5">
        <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#e8e3d9] flex-shrink-0 bg-white">
          <img src={`/assets/logos/${logo}`} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-xs text-neutral tracking-wider">{desc}</div>
          <div className="font-semibold text-xl tracking-tight">{name}</div>
        </div>
      </div>

      <div className="flex-1">
        <ul className="text-[14.5px] space-y-[5px] text-emotional mb-6">
          {features.map((f: string, i: number) => <li key={i}>• {f}</li>)}
        </ul>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="uppercase text-[10px] tracking-[1px] font-semibold text-neutral">Prompt ejemplo</span>
          <CopyButton text={prompt} />
        </div>
        <div className="prompt-box p-4 text-[13px] leading-[1.45] text-[#2c2522]">
          {prompt}
        </div>
      </div>
    </div>
  )
}

function App() {
  // Exact copy from user
  const copy = {
    paso1: {
      nano: "Retrato fotorrealista 85mm f/1.4 RAW de esta persona exacta, misma identidad, mismo cabello, mismas proporciones. Iluminación de estudio suave, fondo blanco limpio, micro-detalle alto con textura de piel real y poros. Preservar estructura facial con precisión.",
      flux: "Crea un retrato hiperrealista de esta persona con iluminación suave cinematográfica, estética de profundidad 85mm, textura RAW, arrugas y poros naturales. Preservar identidad exacta con realismo HDR.",
      seedream: "Genera un retrato frontal RAW con textura de piel fotorrealista, asimetría natural y claridad alta. Mantener identidad exacta, forma del cabello y geometría facial.",
      chatgpt: "Genera un retrato hiperrealista de esta persona conservando identidad facial exacta. Estilo fotografía profesional 8K, iluminación de estudio, fondo neutro, alta nitidez en rostro y textura de piel real."
    },
    paso2: "Plano medio fotorrealista de esa persona caminando naturalmente, misma identidad y proporciones. Tomado con lente 50mm en exteriores, luz natural suave, movimiento real de tela, sombras limpias.",
    paso4: "Clonar esta voz con claridad cálida y media-grave, micro-pausas naturales, acento limpio, respiración suave y ritmo articulado. Preservar tonalidad emocional para tutoriales y estilo de conversación profesional.",
    paso5: {
      veo: `{
 "description": "Sujeto cinematográfico de pie con movimiento suave y giro sutil de cabeza.",
 "camera": "estática con dolly lento",
 "lighting": "luz clave difusa suave",
 "subject_behavior": {"movement": "respiración suave, micro-giro de cabeza"},
 "environment": "estudio limpio"
}`,
      kling: "Movimiento cinematográfico con lente 35mm. Parpadeo natural y movimiento sutil de cabeza, ligero movimiento de hombros, postura calmada. Fondo con parallax. Emoción cálida, confiada, humana."
    }
  }

  return (
    <div className="bg-bg text-text-strong font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-xl border-b border-[#e8e3d9]">
        <div className="max-w-6xl mx-auto px-6 h-[78px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-2xl tracking-[-0.6px]">Modo Creador</span>
            <span className="text-[10px] px-2 py-px bg-[#e8e3d9] rounded text-neutral tracking-[1px]">2.0</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a href="#sistema" className="hover:text-cta transition-colors">El Sistema</a>
            <a href="#verdad" className="hover:text-cta transition-colors">La Verdad</a>
            <a href="#oferta" className="btn-primary text-sm py-2.5 px-6">Entrar a Modo Creador</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline text-xs tracking-[2.2px] px-5 py-1.5 rounded-full border border-[#d9d3c7] mb-8">IA HUMANA • UGC PREMIUM • SIN CÁMARA</div>
        
        <h1 className="text-7xl md:text-[82px] leading-[0.92] font-semibold tracking-[-3.8px] mb-8">
          Sabes que podrías estar <span className="text-cta">ganando dinero</span><br />con tu contenido.
        </h1>
        <p className="max-w-lg mx-auto text-2xl text-neutral tracking-tight">Pero sigues esperando. Esperando estar listo. Esperando tener equipo.</p>

        <div className="flex gap-3 justify-center mt-10">
          <a href="#sistema" className="btn-primary text-[15px] px-8 py-4">Ver el sistema completo</a>
          <a href="#oferta" className="btn-secondary text-[15px] px-7 py-4">Quiero cobrar como agencia</a>
        </div>
      </section>

      {/* EXACT PAIN STORY */}
      <section className="max-w-[720px] mx-auto px-6 text-[17.5px] leading-[1.65] pb-20 text-[#2f2724]">
        <p className="mb-5">Y mientras esperas, otros —con menos talento que tú— ya están cobrando como agencia.</p>
        <p className="mb-5">Y sabes que tienes algo que decir….</p>
        <p className="mb-5">Pero cada vez que abres la cámara, te paralizas.</p>

        <blockquote className="border-l-[5px] border-cta pl-7 my-9 text-2xl text-emotional tracking-tight">No te sientes listo. No te ves "profesional". Y mientras tanto, otros creadores —con menos talento que tú— están consiguiendo marcas, ventas y autoridad.</blockquote>

        <p className="mb-5">No es justo.</p>
        <p className="mb-8">Y no es tu culpa. Nadie te enseñó cómo usar la IA a tu favor.</p>

        <div className="h-px bg-[#d9d3c7] my-8" />

        <p className="text-3xl font-semibold tracking-[-1px] text-text-strong mb-6">Hoy ya no necesitas grabarte para crecer.</p>

        <p className="mb-5">Existe un sistema para clonarte con IA —tu cara, tu voz, tu movimiento— y producir contenido todos los días sin volver a abrir la cámara. Pero sobre todo: poder enviarlo a las marcas como contenido <span className="font-semibold text-cta">UGC PREMIUM</span> y ganar mucho dinero.</p>
        <p className="font-semibold">Así que vamos al grano. Los pasos son:</p>
      </section>

      {/* SISTEMA */}
      <section id="sistema" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <div className="text-cta text-xs tracking-[3px] mb-2">EL SISTEMA COMPLETO PARA CLONARTE CON IA</div>
          <h2 className="section-title tracking-[-1.5px]">Esta guía transforma una simple selfie<br />en un avatar que habla, se mueve y produce contenido.</h2>
        </div>

        {/* PASO 1 */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">01</div>
            <div>
              <div className="text-highlight text-sm tracking-[2px] font-semibold">LA BASE DE TODO</div>
              <div className="text-4xl font-semibold tracking-tight">PASO 1 — CREACIÓN DEL ROSTRO</div>
            </div>
          </div>

          <div className="max-w-3xl text-[15.5px] text-[#2f2724] mb-8">
            El rostro define si tu clon es creíble o no. Un retrato hiperrealista que conserve tu identidad exacta es lo que asegura consistencia en cada imagen, video y animación que crees después.<br />Por eso se usan herramientas especializadas en preservación de identidad, micro-detalle de piel y calidad RAW fotográfica.
          </div>

          {/* Proof images */}
          <div className="grid md:grid-cols-3 gap-3 mb-8">
            <img src="/assets/images/UGC_Premium__A_photorealistic_close-up_202605251403.jpeg" className="rounded-2xl w-full" alt="UGC Premium" />
            <img src="/assets/images/Autoridad__A_photorealistic_close-up_of_202605251404.jpeg" className="rounded-2xl w-full" alt="Autoridad" />
            <img src="/assets/images/Calidad_RAW_fotográfica__A_photorealistic_202605251403.jpeg" className="rounded-2xl w-full" alt="Calidad RAW" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <ToolOption logo="nano banana pro.jpg" name="NanoBanana Pro" desc="OPCIÓN A — POR DEFECTO" features={["Líder en exactitud de rostro","Renderiza piel RAW fotorrealista","Soporta múltiples ángulos","Ideal para fotorrealismo en redes"]} prompt={copy.paso1.nano} />
            <ToolOption logo="Flux 2.0.jpg" name="Flux 2.0" desc="OPCIÓN B" features={["Simulación de iluminación cinematográfica","Excelente con piel, poros, micro-imperfecciones","Color y tonalidad natural"]} prompt={copy.paso1.flux} />
            <ToolOption logo="Seedream 4.png" name="Seedream 4" desc="OPCIÓN C" features={["Modelo de piel y textura más fino","Excelente para fotografía profesional cerrada","Mantiene identidad con precisión extrema"]} prompt={copy.paso1.seedream} />
            <ToolOption logo="ChatGPT 2.png" name="ChatGPT 2" desc="OPCIÓN D" features={["Integración nativa con generación de imagen","Rápida iteración con lenguaje natural","Ideal si recién estás empezando"]} prompt={copy.paso1.chatgpt} />
          </div>

          <div className="mt-5 text-sm text-emotional border-l-4 border-cta pl-4">Si la identidad falla en la base, todo el clon falla. El video, la voz, el contenido de autoridad —todo depende de un rostro consistente y creíble.</div>
        </div>

        {/* PASO 2 */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">02</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 2 — CONSTRUIR TU DATASET VISUAL</div>
          </div>
          <p className="max-w-3xl text-[15.5px] mb-8">Una sola foto no alcanza. Necesitas entre 10 y 20 imágenes del mismo rostro clonado en distintas poses, outfits, ángulos y escenarios. Una sola imagen se ve tiesa. Un dataset le da flexibilidad a tu clon.</p>

          <div className="premium-card p-8 mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-xs tracking-wider font-semibold text-neutral">PROMPT EJEMPLO PARA DATASET</span>
              <CopyButton text={copy.paso2} label="Copiar prompt" />
            </div>
            <div className="prompt-box p-6 text-[13.5px]">{copy.paso2}</div>
          </div>

          <div className="text-sm text-emotional">Variaciones que tu dataset debe incluir: De pie / sentado / caminando — Sonriendo / serio / hablando — Outfit casual / oficina / elegante — Ángulos: frontal, ¾, perfil — Interior y exterior.</div>
        </div>

        {/* PASO 3 */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">03</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 3 — ESCALAR A 4K–8K (NO NEGOCIABLE)</div>
          </div>
          <p className="max-w-3xl mb-8">Este paso es lo que separa el contenido amateur del que parece campaña real. Sin resolución 4K+, las herramientas de movimiento generan artefactos, pixelado y se nota la IA al instante.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["OpenArt Upscaler.png","Magnific AI.jpg","Lupa AI.png","Google Flow.jpg"].map((l, i) => (
              <div key={i} className="premium-card p-6 text-center">
                <div className="h-9 w-9 mx-auto mb-3"><img src={`/assets/logos/${l}`} className="h-full w-auto mx-auto" /></div>
                <div className="font-semibold">{l.replace('.png','').replace('.jpg','')}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-neutral">Instrucción: Subir imagen → elegir x4 o x8 → activar modo detalle → exportar en PNG 4K–8K.</div>
        </div>

        {/* PASO 4 */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">04</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 4 — CLONAR TU VOZ</div>
          </div>
          <p>La voz es el alma de tu avatar. Sin voz propia, no eres tú: es un robot. Las herramientas de clonación replican tu tono, tu respiración, tus pausas, tu emoción.</p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="premium-card p-7">
              <div className="flex gap-4"><img src="/assets/logos/ElevenLabs.png" className="h-9" /><div><div className="font-semibold text-lg">ElevenLabs</div><div className="text-xs text-neutral">El estándar de la industria</div></div></div>
              <ul className="mt-5 text-sm space-y-1 text-emotional">
                <li>• Replica acento, respiración, micro-pausas</li>
                <li>• Calidad de estudio</li>
                <li>• Soporta más de 30 idiomas</li>
              </ul>
              <div className="mt-5">
                <CopyButton text={copy.paso4} label="Copiar prompt de voz" />
              </div>
            </div>
            <div className="premium-card p-7">
              <div className="flex gap-4"><img src="/assets/logos/Hedra Voice.png" className="h-9" /><div><div className="font-semibold text-lg">Hedra Voice</div><div className="text-xs text-neutral">Para clones que hablan en video</div></div></div>
              <p className="mt-4 text-sm text-emotional">Combina voz + sincronización de boca. Ideal para talking-heads.</p>
            </div>
          </div>
        </div>

        {/* PASO 5 */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">05</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 5 — IMAGEN A VIDEO</div>
          </div>
          <p>Aquí es donde tu imagen estática se vuelve un video real.</p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="premium-card p-7">
              <div><img src="/assets/logos/Google VEO 3.1.png" className="h-8 mb-4" /><span className="font-semibold">VEO 3.1</span></div>
              <div className="text-sm mt-3">La mejor para campañas cinematográficas. Control total por JSON.</div>
              <div className="mt-4"><CopyButton text={copy.paso5.veo} label="Copiar JSON" /></div>
            </div>
            <div className="premium-card p-7">
              <div><img src="/assets/logos/Kling AI.jpg" className="h-8 mb-4" /><span className="font-semibold">Kling AI</span></div>
              <div className="text-sm mt-3">La más fácil para movimiento humano natural.</div>
              <div className="mt-4"><CopyButton text={copy.paso5.kling} label="Copiar prompt" /></div>
            </div>
            <div className="premium-card p-7">
              <div><img src="/assets/logos/Seedance 2.0.jpg" className="h-8 mb-4" /><span className="font-semibold">Seedance 2.0</span></div>
              <div className="text-sm mt-3">La más realista para movimiento corporal completo.</div>
            </div>
            <div className="premium-card p-7">
              <div><img src="/assets/logos/Motion by Google.png" className="h-8 mb-4" /><span className="font-semibold">Motion by Google</span></div>
              <div className="text-sm mt-3">El más limpio para movimiento sutil.</div>
            </div>
          </div>
        </div>

        {/* PASO 6 */}
        <div>
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">06</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 6 — ENSAMBLAJE FINAL</div>
          </div>
          <p>Exportas el video animado → sincronizas la voz → agregas captions → publicas. Repites el proceso. Tu clon se convierte en una máquina de contenido diaria.</p>
        </div>
      </section>

      {/* VERDAD INCÓMODA - EXACT COPY */}
      <section id="verdad" className="bg-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-highlight text-xs tracking-[2.5px] mb-3">AHORA, LA VERDAD INCÓMODA</div>
          <h2 className="text-5xl font-semibold tracking-tight mb-8">Ya tienes el mapa.<br />Pero el mapa no es el sistema.</h2>
          <div className="space-y-4 text-lg opacity-90">
            <div>¿Cuál de las herramientas elegir si nunca las has usado?</div>
            <div>¿Qué prompt exacto usar para que la IA NO te cambie la cara?</div>
            <div>¿Cómo combinar voz + imagen + video sin que se vea falso?</div>
            <div>¿Qué decir en el video para que las marcas te paguen?</div>
            <div>¿Cómo enviar tu UGC a marcas reales y cobrar como agencia?</div>
          </div>
          <p className="mt-8 text-xl">Eso no se aprende en una guía.<br />Eso se aprende con un sistema ya probado: <span className="font-semibold text-highlight">"Modo Creador"</span></p>
        </div>
      </section>

      {/* MODO CREADOR - OFERTA EXACTA */}
      <section id="oferta" className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-xs text-cta tracking-[2.5px]">MODO CREADOR</div>
        <h2 className="text-6xl font-semibold tracking-[-2px] mt-3 mb-5">El sistema completo para crear cualquier tipo de contenido.</h2>
        
        <div className="flex justify-center gap-2 mb-8">
          {["Videos cortos", "Videos Largos", "Podcast", "UGC con IA"].map(t => (
            <div key={t} className="text-sm px-4 py-1 rounded-full bg-white border">{t}</div>
          ))}
        </div>

        <p className="text-lg mb-8 text-neutral">Todo lo que se te ocurra — como si tuvieras una agencia, un estudio y un equipo de producción detrás.</p>

        <div className="mb-4 text-sm text-neutral">Pago único. Acceso de por vida. Todas las actualizaciones futuras incluidas.</div>

        <div className="text-[13px] mb-2 text-neutral tracking-wider">Solo los primeros 50 tendrán acceso a</div>
        <div className="flex items-baseline justify-center gap-3 mb-6">
          <span className="text-7xl font-semibold tracking-tighter">29</span>
          <span className="text-3xl text-neutral">USD</span>
          <span className="text-xl line-through text-neutral/70">59 USD</span>
        </div>

        <a href="#" className="btn-primary text-lg px-12 py-4 inline-flex mx-auto">QUIERO ENTRAR A MODO CREADOR <ArrowRight /></a>

        <div className="text-xs text-neutral mt-6">No esperes a estar listo. El precio sube en cuanto se agoten los primeros 50.</div>
      </section>

      <footer className="border-t py-8 text-center text-xs text-neutral border-[#d9d3c7]">
        Modo Creador — Empieza a verte como la marca que ya eres.
      </footer>
    </div>
  )
}

export default App
