import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ArrowRight } from 'lucide-react'

// SPECTACULAR Copy Button - "Efecto Increíble" version
function CopyButton({ text, label = "Copiar prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }

    setCopied(true)

    // Reset after nice duration
    setTimeout(() => setCopied(false), 2600)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={`group relative overflow-hidden rounded-full border px-5 py-2 text-sm font-medium transition-all active:scale-[0.985] ${
        copied 
          ? 'border-[#006b5b] bg-[#006b5b] text-white shadow-lg' 
          : 'border-[#d9d3c7] bg-white text-[#101820] hover:border-[#006b5b] hover:text-[#006b5b]'
      }`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
            >
              <Check size={17} />
            </motion.div>
            <span className="font-semibold tracking-tight">¡Copiado al portapapeles!</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Copy size={16} className="transition-transform group-hover:-translate-y-px" />
            <span>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle shine effect on success */}
      {copied && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      )}
    </button>
  )
}

// Beautiful Reference → Result visual block (exactly as user requested)
function ImageResultPair({ 
  referenceSrc, 
  resultSrc, 
  prompt, 
  title 
}: { 
  referenceSrc: string; 
  resultSrc: string; 
  prompt: string; 
  title: string;
}) {
  return (
    <div className="premium-card p-8">
      <div className="mb-4">
        <div className="text-xs uppercase tracking-[2px] text-neutral font-semibold">Referencia → Resultado Real</div>
        <div className="font-semibold text-xl tracking-tight mt-1">{title}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Reference (Base) - Fully visible */}
        <div>
          <div className="text-[10px] tracking-wider text-neutral mb-2 pl-1">IMAGEN DE REFERENCIA (INPUT)</div>
          <div className="relative rounded-2xl overflow-hidden border border-[#d9d3c7] bg-[#f8f5f0] aspect-[4/3]">
            <img 
              src={referenceSrc} 
              alt="Referencia" 
              className="w-full h-full object-contain bg-[#f8f5f0]" 
            />
          </div>
        </div>

        {/* Generated Result - Fully visible */}
        <div>
          <div className="text-[10px] tracking-wider text-neutral mb-2 pl-1 flex items-center gap-2">
            RESULTADO GENERADO CON IA
            <span className="inline-block w-2 h-2 rounded-full bg-[#006b5b]" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-[#006b5b]/30 shadow-lg bg-[#f8f5f0] aspect-[4/3]">
            <img 
              src={resultSrc} 
              alt="Resultado generado" 
              className="w-full h-full object-contain bg-[#f8f5f0]" 
            />
          </div>
        </div>
      </div>

      {/* Prompt below the images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-[1px] text-neutral">PROMPT UTILIZADO PARA GENERAR ESTE RESULTADO</span>
          <CopyButton text={prompt} label="Copiar prompt exacto" />
        </div>
        <div className="prompt-box p-5 text-[13.5px] leading-relaxed text-[#2c2522] border-l-4 border-[#006b5b]">
          {prompt}
        </div>
      </div>
    </div>
  )
}



function App() {
  // State for interactive tool selection in Paso 1
  const [activeTool, setActiveTool] = useState<'nano' | 'flux' | 'seedream' | 'chatgpt'>('nano')

  const toolData = {
    nano: {
      name: "NanoBanana Pro",
      desc: "OPCIÓN A — RECOMENDADA",
      features: ["Máxima precisión de identidad facial", "Piel RAW fotorrealista", "Soporta múltiples ángulos", "Ideal para UGC premium"],
      prompt: "Retrato fotorrealista 85mm f/1.4 RAW de esta persona exacta, misma identidad, mismo cabello, mismas proporciones. Iluminación de estudio suave, fondo blanco limpio, micro-detalle alto con textura de piel real y poros. Preservar estructura facial con precisión."
    },
    flux: {
      name: "Flux 2.0",
      desc: "OPCIÓN B",
      features: ["Iluminación cinematográfica superior", "Excelente en poros y micro-texturas", "Tonalidad natural y emocional"],
      prompt: "Crea un retrato hiperrealista de esta persona con iluminación suave cinematográfica, estética de profundidad 85mm, textura RAW, arrugas y poros naturales. Preservar identidad exacta con realismo HDR."
    },
    seedream: {
      name: "Seedream 4",
      desc: "OPCIÓN C",
      features: ["Máxima nitidez en close-ups", "Textura de piel más fina", "Precisión extrema en identidad"],
      prompt: "Genera un retrato frontal RAW con textura de piel fotorrealista, asimetría natural y claridad alta. Mantener identidad exacta, forma del cabello y geometría facial."
    },
    chatgpt: {
      name: "ChatGPT 2",
      desc: "OPCIÓN D — MÁS ACCESIBLE",
      features: ["Fácil de usar para principiantes", "Buena para iteraciones rápidas", "Calidad sólida para empezar"],
      prompt: "Genera un retrato hiperrealista de esta persona conservando identidad facial exacta. Estilo fotografía profesional 8K, iluminación de estudio, fondo neutro, alta nitidez en rostro y textura de piel real."
    }
  }

  const currentTool = toolData[activeTool]

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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-cta text-xs tracking-[3px] mb-2">EL SISTEMA COMPLETO PARA CLONARTE CON IA</div>
          <h2 className="section-title tracking-[-1.5px]">Esta guía transforma una simple selfie<br />en un avatar que habla, se mueve y produce contenido.</h2>
        </motion.div>

        {/* PASO 1 - RESTRUCTURED: Reference → Result → Prompt (as requested) */}
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

          {/* Reference Gallery */}
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[2px] text-neutral mb-3">IMÁGENES DE REFERENCIA (LOS 4 INPUTS ORIGINALES)</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "/assets/images/1.jpeg",
                "/assets/images/2.png",
                "/assets/images/3.jpeg",
                "/assets/images/4.jpeg"
              ].map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-[#d9d3c7]">
                  <img src={src} alt={`Referencia ${i+1}`} className="w-full aspect-[16/10] object-cover" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-emotional mb-8">Estas 4 imágenes son las referencias base. Todo lo que ves abajo se generó a partir de ellas usando los prompts + herramientas.</p>

          {/* === VISUAL PAIRS: Reference + Result + Prompt (CORE REQUEST) === */}
          <div className="space-y-8 mb-10">
            <ImageResultPair 
              referenceSrc="/assets/images/1.jpeg"
              resultSrc="/assets/images/UGC_que_vende__A_medium_202605251403.jpeg"
              prompt="Retrato fotorrealista 85mm f/1.4 RAW de esta persona exacta, misma identidad, mismo cabello, mismas proporciones. Iluminación de estudio suave, fondo blanco limpio, micro-detalle alto con textura de piel real y poros. Preservar estructura facial con precisión."
              title="UGC que vende — Generado con NanoBanana Pro"
            />

            <ImageResultPair 
              referenceSrc="/assets/images/3.jpeg"
              resultSrc="/assets/images/Autoridad__A_photorealistic_close-up_of_202605251404.jpeg"
              prompt="Crea un retrato hiperrealista de esta persona con iluminación suave cinematográfica, estética de profundidad 85mm, textura RAW, arrugas y poros naturales. Preservar identidad exacta con realismo HDR."
              title="Presencia de Autoridad — Generado con Flux 2.0"
            />
          </div>

          <div className="text-sm text-emotional border-l-4 border-cta pl-4">
            Si la identidad falla en la base, todo el clon falla. El video, la voz, el contenido de autoridad —todo depende de un rostro consistente y creíble.
          </div>

          {/* TOOLS AS SELECTABLE OPTIONS - Interactive (as requested) */}
          <div className="mt-10">
            <div className="text-xs uppercase tracking-[2px] text-neutral mb-3">ELIGE LA HERRAMIENTA</div>
            
            {/* Tool selector pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['nano', 'flux', 'seedream', 'chatgpt'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTool(key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all border ${
                    activeTool === key 
                      ? 'bg-[#006b5b] text-white border-[#006b5b] shadow-sm' 
                      : 'border-[#d9d3c7] hover:border-[#006b5b] hover:text-[#006b5b] bg-white'
                  }`}
                >
                  {toolData[key].name}
                </button>
              ))}
            </div>

            {/* Active Tool Details - Clean and focused */}
            <div className="premium-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-2xl font-semibold tracking-tight">{currentTool.name}</div>
                <div className="text-xs px-3 py-1 rounded-full bg-[#f8f5f0] text-neutral border">{currentTool.desc}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="uppercase text-xs tracking-wider text-neutral mb-3">VENTAJAS</div>
                  <ul className="space-y-2 text-[15px] text-[#2f2724]">
                    {currentTool.features.map((f, i) => (
                      <li key={i} className="flex gap-2">• {f}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="uppercase text-xs tracking-wider text-neutral">PROMPT RECOMENDADO</div>
                    <CopyButton text={currentTool.prompt} label="Copiar" />
                  </div>
                  <div className="prompt-box p-5 text-[13.5px] leading-relaxed text-[#2c2522]">
                    {currentTool.prompt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PASO 2 - DATASET VISUAL (improved) */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">02</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 2 — CONSTRUIR TU DATASET VISUAL</div>
          </div>

          <p className="max-w-3xl text-[15.5px] mb-8">
            Una sola foto no alcanza. Necesitas entre 10 y 20 imágenes del mismo rostro clonado en distintas poses, outfits, ángulos y escenarios. 
            Una sola imagen se ve tiesa. Un dataset le da flexibilidad a tu clon: escenas caminando, hablando, gesticulando, en distintos moods.
          </p>

          {/* Visual examples of dataset variations */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="premium-card p-4">
              <img src="/assets/images/Atuendo_de_Dataset__A_photorealistic_202605251403.jpeg" className="rounded-xl w-full mb-3" alt="Dataset outfit" />
              <div className="text-xs text-neutral">Outfit / Ángulo variado</div>
            </div>
            <div className="premium-card p-4">
              <img src="/assets/images/Ángulo_de_Dataset__A_photorealistic_202605251403.jpeg" className="rounded-xl w-full mb-3" alt="Different angle" />
              <div className="text-xs text-neutral">Ángulo y expresión</div>
            </div>
            <div className="premium-card p-4">
              <img src="/assets/images/Campañas_cinematográficas__A_cinematic_medium_202605251404.jpeg" className="rounded-xl w-full mb-3" alt="Cinematic context" />
              <div className="text-xs text-neutral">Contexto cinematográfico</div>
            </div>
          </div>

          <div className="premium-card p-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-wider font-semibold text-neutral">PROMPT EJEMPLO PARA DATASET</span>
              <CopyButton text={copy.paso2} label="Copiar prompt" />
            </div>
            <div className="prompt-box p-6 text-[13.5px]">{copy.paso2}</div>
          </div>

          <div className="mt-4 text-sm text-emotional">
            Variaciones que tu dataset debe incluir: De pie / sentado / caminando — Sonriendo / serio / hablando — Outfit casual / oficina / elegante — Ángulos: frontal, ¾, perfil — Interior y exterior.
          </div>
        </div>

        {/* PASO 3 - ESCALAR A 4K-8K (with clear Before/After as requested) */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">03</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 3 — ESCALAR A 4K–8K (NO NEGOCIABLE)</div>
          </div>

          <p className="max-w-3xl mb-8">
            Este paso es lo que separa el contenido amateur del que parece campaña real. 
            Sin resolución 4K+, las herramientas de movimiento generan artefactos, pixelado y se nota la IA al instante.
          </p>

          {/* BEFORE / AFTER - Low quality vs High quality upscale */}
          <div className="premium-card p-8 mb-8">
            <div className="text-xs uppercase tracking-[2px] text-neutral mb-4">EL PROBLEMA Y LA SOLUCIÓN</div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ANTES - Mala calidad */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold tracking-wider text-red-600">ANTES</span>
                  <span className="text-xs text-neutral">— Baja resolución / Artefactos</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-[#d9d3c7] bg-[#f8f5f0] aspect-[16/10]">
                  <img 
                    src="/assets/images/3.jpeg" 
                    alt="Antes - Baja resolución" 
                    className="w-full h-full object-cover opacity-70" 
                  />
                  {/* Visual indicator of bad quality */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#00000010_0,#00000010_4px,#00000000_4px,#00000000_12px)]"></div>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                    Pixelado • Artefactos • Se nota IA
                  </div>
                </div>
              </div>

              {/* DESPUÉS - Alta calidad con upscale */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold tracking-wider text-[#006b5b]">DESPUÉS</span>
                  <span className="text-xs text-neutral">— 4K-8K Upscale</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-[#006b5b]/40 shadow-lg bg-[#f8f5f0] aspect-[16/10]">
                  <img 
                    src="/assets/images/Detalle_de_Upscale__An_extreme_202605251403.jpeg" 
                    alt="Después - Alta resolución" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-3 left-3 bg-[#006b5b]/90 text-white text-[10px] px-2 py-0.5 rounded">
                    Nitidez extrema • Sin artefactos • Calidad cinematográfica
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-emotional">
              Saltarte este paso es la razón #1 por la que el contenido se ve "hecho con IA". 
              Hacer este paso es la razón #1 por la que el contenido se ve hecho por una agencia.
            </div>
          </div>

          {/* Tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { logo: "OpenArt Upscaler.png", name: "OpenArt", desc: "Rápido y balanceado" },
              { logo: "Magnific AI.jpg", name: "Magnific", desc: "Detalle ultra, poros" },
              { logo: "Lupa AI.png", name: "Lupa AI", desc: "Más realista en rostros" },
              { logo: "Google Flow.jpg", name: "Google Flow", desc: "Escalado en lote" }
            ].map((tool, i) => (
              <div key={i} className="premium-card p-6 hover:border-[#006b5b]/30 transition-all text-center">
                <div className="h-9 w-9 mx-auto mb-4"><img src={`/assets/logos/${tool.logo}`} className="h-full w-auto mx-auto" /></div>
                <div className="font-semibold">{tool.name}</div>
                <div className="text-xs text-neutral mt-1">{tool.desc}</div>
              </div>
            ))}
          </div>

          <div className="premium-card p-6 text-sm">
            <span className="font-semibold">Flujo recomendado:</span> Subir imagen → elegir x4 o x8 → activar modo detalle → exportar en PNG 4K–8K.
          </div>
        </div>

        {/* PASO 4 - VOICE (improved) */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">04</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 4 — CLONAR TU VOZ</div>
          </div>

          <p className="max-w-3xl mb-8">
            La voz es el alma de tu avatar. Sin voz propia, no eres tú: es un robot. 
            Las herramientas de clonación replican tu tono, tu respiración, tus pausas, tu emoción. Una voz clonada bien hecha es lo que hace que la gente te crea.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="premium-card p-7">
              <div className="flex gap-4 mb-4">
                <img src="/assets/logos/ElevenLabs.png" className="h-9" />
                <div>
                  <div className="font-semibold text-lg">ElevenLabs</div>
                  <div className="text-xs text-neutral">El estándar de la industria</div>
                </div>
              </div>
              <ul className="text-sm space-y-1 text-emotional mb-5">
                <li>• Replica acento, respiración, micro-pausas</li>
                <li>• Calidad de estudio profesional</li>
                <li>• Soporta más de 30 idiomas</li>
              </ul>
              <CopyButton text={copy.paso4} label="Copiar prompt de voz" />
            </div>

            <div className="premium-card p-7">
              <div className="flex gap-4 mb-4">
                <img src="/assets/logos/Hedra Voice.png" className="h-9" />
                <div>
                  <div className="font-semibold text-lg">Hedra Voice</div>
                  <div className="text-xs text-neutral">Para clones que hablan en video</div>
                </div>
              </div>
              <p className="text-sm text-emotional mb-5">
                Combina voz + sincronización de boca. Ideal para talking-heads y contenido UGC que necesita movimiento de labios realista.
              </p>
              <div className="text-xs text-neutral">Recomendado cuando vas a generar video con voz.</div>
            </div>
          </div>
        </div>

        {/* PASO 5 - WITH REAL VIDEO DEMOS (B) */}
        <div className="mb-20">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">05</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 5 — IMAGEN A VIDEO (MOVIMIENTO REAL)</div>
          </div>

          <p className="max-w-3xl mb-8">Aquí es donde tu imagen estática se vuelve un video real. El movimiento bien hecho hace que la gente jure que estás grabando.</p>

          {/* Visual examples for Image-to-Video (no actual video, as requested) */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-[2px] text-neutral mb-3">EJEMPLOS DE MOVIMIENTO (REFERENCIA → RESULTADO)</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="premium-card p-4">
                <div className="text-[10px] text-neutral mb-2">REFERENCIA</div>
                <img src="/assets/images/1.jpeg" className="rounded-xl w-full mb-3" alt="Referencia" />
                <div className="text-[10px] text-neutral mb-1">RESULTADO CON MOVIMIENTO</div>
                <img src="/assets/images/Campañas_cinematográficas__A_cinematic_medium_202605251404.jpeg" className="rounded-xl w-full" alt="Con movimiento" />
              </div>
              <div className="premium-card p-4">
                <div className="text-[10px] text-neutral mb-2">REFERENCIA</div>
                <img src="/assets/images/3.jpeg" className="rounded-xl w-full mb-3" alt="Referencia" />
                <div className="text-[10px] text-neutral mb-1">RESULTADO CON MOVIMIENTO</div>
                <img src="/assets/images/Detalle_de_Upscale__An_extreme_202605251403.jpeg" className="rounded-xl w-full" alt="Con movimiento" />
              </div>
            </div>
          </div>

          {/* Tool options for video */}
          <div className="grid md:grid-cols-2 gap-4">
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

        {/* PASO 6 - FINAL ASSEMBLY (solid) */}
        <div className="mb-16">
          <div className="flex gap-4 items-baseline mb-6">
            <div className="text-[72px] font-semibold text-highlight leading-none tracking-[-3px]">06</div>
            <div className="text-4xl font-semibold tracking-tight">PASO 6 — ENSAMBLAJE FINAL</div>
          </div>

          <p className="max-w-3xl mb-8">
            Exportas el video animado → sincronizas la voz → agregas captions → publicas. 
            Repites el proceso. Tu clon se convierte en una máquina de contenido diaria sin que tú salgas en cámara ni una sola vez.
          </p>

          {/* Simple summary table */}
          <div className="premium-card p-8">
            <div className="text-xs uppercase tracking-wider text-neutral mb-4">RESUMEN DEL FLUJO COMPLETO</div>
            
            <div className="space-y-3 text-sm">
              {[
                ["1", "Crear rostro", "Base de identidad"],
                ["2", "Construir dataset", "Variedad visual"],
                ["3", "Upscale 4K-8K", "Listo para video"],
                ["4", "Clonar voz", "Presencia auténtica"],
                ["5", "Generar movimiento", "Realismo humano"],
                ["6", "Ensamblar y publicar", "Contenido de autoridad"]
              ].map(([num, action, result], i) => (
                <div key={i} className="flex items-center gap-4 border-b border-[#e8e3d9] pb-2 last:border-0">
                  <div className="w-6 text-center font-mono text-[#006b5b]">{num}</div>
                  <div className="flex-1">{action}</div>
                  <div className="text-neutral text-xs">{result}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-sm text-emotional">
            Cada paso construye sobre el anterior. Pasos débiles rompen la ilusión. Pasos fuertes crean un clon perfecto.
          </div>
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
