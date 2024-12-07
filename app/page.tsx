"use client";

import { DailyTransport } from "@daily-co/realtime-ai-daily";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect, useRef, useState } from "react";
import { FunctionCallParams, LLMHelper, RTVIClient } from "realtime-ai";
import { RTVIClientAudio, RTVIClientProvider } from "realtime-ai-react";

import App from "@/components/App";
import { AppProvider } from "@/components/context";
import Header from "@/components/Header";
import Splash from "@/components/Splash";
import {
  BOT_READY_TIMEOUT,
  defaultConfig,
  defaultServices,
} from "@/rtvi.config";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const voiceClientRef = useRef<RTVIClient | null>(null);

  console.log("Rendering from Home function");

  // useEffect(() => {
  //   if (!showSplash || voiceClientRef.current) {
  //     return;
  //   }

  useEffect(() => {
    if (voiceClientRef.current) {
      console.log("Voice client already exists");
      return;
    }

    const voiceClient = new RTVIClient({
      transport: new DailyTransport(),
      params: {
        baseUrl: `/api`,
        requestData: {
          services: {
            stt: "deepgram",
            tts: "cartesia",
            llm: "anthropic",
          },
        },
        endpoints: {
          connect: "/connect",
          action: "/actions",
        },
        config: [
          {
            service: "tts",
            options: [
              {
                name: "voice",
                value: "79a125e8-cd45-4c13-8a67-188112f4dd22",
              },
            ],
          },
          ...defaultConfig,
        ],
        },
      });

    // const voiceClient = new RTVIClient({
    //   transport: new DailyTransport(),
    //   params: {
    //     baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "/api",
    //     requestData: {
    //       services: defaultServices,
    //       config: defaultConfig,
    //     },
    //   },
    //   timeout: BOT_READY_TIMEOUT,
    // });

    // Below the RTVIClient instance you created
    const llmHelper = voiceClient.registerHelper(
      "llm",
      new LLMHelper({
        callbacks: {},
      })
    ) as LLMHelper;

    // llmHelper.handleFunctionCall(async (fn: FunctionCallParams) => {
    //   const args = fn.arguments as any;
    //   if (fn.functionName === "get_weather" && args.location) {
    //     const response = await fetch(
    //       `/api/weather?location=${encodeURIComponent(args.location)}`
    //     );
    //     const json = await response.json();
    //     return json;
    //   } else {
    //     return { error: "couldn't fetch weather" };
    //   }

      llmHelper.handleFunctionCall(async (fn: FunctionCallParams) => {
        const args = fn.arguments as any;
        if (fn.functionName === "search_similar_learning_questions") {
          console.log("Going to call the API for similar learning questions");
          const response = await fetch(
            `/api/semantic_search?original_question=blue`
          );
          if (response.ok) {
            console.log("Successfully called the API for similar learning questions");
          }
          const json = await response.json();
          return json;
        } else if (fn.functionName === "start_learning_session") {
          console.log("Going to call the API for starting a learning session");
          const response = await fetch(
            `/api/learning_path/start`
          );
          if (response.ok) {
            console.log("Successfully started a learning session");
          }
          const json = await response.json();
          return json;

        } else {
        return { error: "couldn't fetch similar learning questions" };
      }
    });
    


    // const llmHelper = new LLMHelper({});
    // voiceClient.registerHelper("llm", llmHelper);

    voiceClientRef.current = voiceClient;
  }, [showSplash]);

  if (showSplash) {
    return <Splash handleReady={() => setShowSplash(false)} />;
  }

  return (
    <RTVIClientProvider client={voiceClientRef.current!}>
      <AppProvider>
        <TooltipProvider>
          <main>
            <Header />
            <div id="app">
              <App />
            </div>
          </main>
          <aside id="tray" />
        </TooltipProvider>
      </AppProvider>
      <RTVIClientAudio />
    </RTVIClientProvider>
  );
}
