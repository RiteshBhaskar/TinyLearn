// Web Speech API Voice Engine for TinyLearn
// Supports natural English ("A for Apple", "Five") and Hindi ("अ से अनार") pronunciation

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private speechEnabled: boolean = true;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public setSpeechEnabled(enabled: boolean) {
    this.speechEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public isEnabled(): boolean {
    return this.speechEnabled;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public speak(
    text: string,
    lang: 'en' | 'hi' = 'en',
    onEnd?: () => void,
    rate: number = 0.88,
    pitch: number = 1.15
  ) {
    if (!this.speechEnabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      // Cancel previous utterance
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // Slightly slower, friendly for kids
      utterance.pitch = pitch; // Cheerful, slightly higher pitch

      if (this.voices.length === 0) {
        this.loadVoices();
      }

      if (lang === 'hi') {
        utterance.lang = 'hi-IN';
        // Look for Hindi voice
        const hindiVoice = this.voices.find(
          v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('lekha')
        );
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
      } else {
        utterance.lang = 'en-US';
        // Look for nice English voice (Google US English, Samantha, Daniel, etc.)
        const enVoice = this.voices.find(
          v =>
            (v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Victoria'))) ||
            v.lang === 'en-US'
        ) || this.voices.find(v => v.lang.startsWith('en'));

        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      this.isSpeaking = true;

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }
}

export const speechEngine = new SpeechEngine();
