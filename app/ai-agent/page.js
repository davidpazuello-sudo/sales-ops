"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const suggestedPrompts = [
  "Quais negocios estao com maior risco de estagnacao?",
  "Resuma as falhas recentes na integracao com HubSpot.",
  "Mostre alertas que exigem acao do gestor hoje.",
  "Quais vendedores precisam de coaching imediato?",
];

const historyItems = [
  "Quais indicadores sairam da meta esta semana?",
  "Resuma os gargalos do pipeline por squad.",
  "Existe risco de perda em contas enterprise?",
];

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Sou o agente de IA do SalesOps. Posso analisar o sistema respeitando o seu perfil e mostrar apenas os dados permitidos para o seu acesso.",
  },
  {
    id: 2,
    role: "assistant",
    text: "Escolha uma sugestao ou escreva uma pergunta para comecar a analise.",
  },
];

export default function AIAgentPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  function submitQuestion(question) {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: current.length + 1, role: "user", text: trimmed },
      {
        id: current.length + 2,
        role: "assistant",
        text: "Analise iniciada. Vou considerar permissoes, contexto operacional e sinais do sistema para responder de forma segura.",
      },
    ]);
    setInputValue("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  return (
    <main className={styles.agentShell}>
      <header className={styles.agentTopbar}>
        <div>
          <span className={styles.eyebrow}>AGENTE DE IA</span>
          <h1>Central de analise inteligente</h1>
          <p>Investigue o sistema com historico de perguntas e atalhos rapidos.</p>
        </div>
        <button type="button" className={styles.backButton} onClick={() => router.push("/")}>
          Voltar ao painel
        </button>
      </header>

      <section className={styles.agentLayout}>
        <aside className={styles.historyPanel}>
          <div className={styles.panelHeader}>
            <h2>Historico</h2>
            <p>Perguntas recentes feitas ao agente.</p>
          </div>
          <div className={styles.historyList}>
            {historyItems.map((item) => (
              <button key={item} type="button" className={styles.historyItem} onClick={() => submitQuestion(item)}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className={styles.chatPanel}>
          <div className={styles.panelHeader}>
            <h2>Chat do agente</h2>
            <p>Analises completas respeitando o perfil e o acesso do usuario.</p>
          </div>

          <div className={styles.promptRow}>
            {suggestedPrompts.map((prompt) => (
              <button key={prompt} type="button" className={styles.promptChip} onClick={() => submitQuestion(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <div className={styles.chatStream}>
            {messages.map((message) => (
              <article
                key={message.id}
                className={`${styles.messageBubble} ${message.role === "user" ? styles.messageUser : styles.messageAssistant}`.trim()}
              >
                <span className={styles.messageRole}>{message.role === "user" ? "Voce" : "Agente IA"}</span>
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <form className={styles.chatComposer} onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Pergunte sobre riscos, desempenho, falhas ou oportunidades..."
            />
            <button type="submit">Enviar</button>
          </form>
        </section>
      </section>
    </main>
  );
}
