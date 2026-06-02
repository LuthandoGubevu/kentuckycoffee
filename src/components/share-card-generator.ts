// Canvas-based share card generator — no external dependencies.
// Produces a 1080×1080 PNG Blob styled to match the Kentucky Coffee design system.

const SIZE = 1080;

const COLOR_BG     = '#0A0A0A';
const COLOR_TEXT   = '#F4F4F4';
const COLOR_ACCENT = '#BC0000';
const COLOR_BRAND  = 'rgba(244,244,244,0.40)';

const FONT_BRAND   = 'bold 22px "Inter Tight", sans-serif';
const FONT_MESSAGE = '300 88px "Inter Tight", sans-serif';
const FONT_ENGLISH = 'bold 28px "Inter Tight", sans-serif';
const FONT_HASHTAG = 'bold 22px "Inter Tight", sans-serif';

const MARGIN_X       = 80;
const BRAND_Y        = 120;
const BAR_X          = MARGIN_X;
const BAR_Y          = 200;
const BAR_W          = 2;
const BAR_H          = 60;
const TEXT_CENTER_X  = SIZE / 2;
const TEXT_START_Y   = 420;
const LINE_HEIGHT_MSG = 108;
const LINE_HEIGHT_ENG = 44;
const ENGLISH_GAP    = 60;
const DIVIDER_W      = 80;
const DIVIDER_H      = 2;
const DIVIDER_OFFSET = 56;
const HASHTAG_X      = SIZE - MARGIN_X;
const HASHTAG_Y      = SIZE - MARGIN_X;

function setSpacing(ctx: CanvasRenderingContext2D, px: string): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ctx as any).letterSpacing = px;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  cx: number,
  startY: number,
  lineHeight: number
): number {
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], cx, startY + i * lineHeight);
  }
  return startY + lines.length * lineHeight;
}

async function drawCard(
  ctx: CanvasRenderingContext2D,
  messageText: string,
  englishText?: string
): Promise<void> {
  await document.fonts.ready;

  // Background
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Brand label
  ctx.fillStyle = COLOR_BRAND;
  ctx.font = FONT_BRAND;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  setSpacing(ctx, '5px');
  ctx.fillText('KENTUCKY COFFEE', MARGIN_X, BRAND_Y);
  setSpacing(ctx, '0px');

  // Accent dot (top-right)
  ctx.fillStyle = COLOR_ACCENT;
  ctx.beginPath();
  ctx.arc(SIZE - MARGIN_X, BRAND_Y - 12, 3, 0, Math.PI * 2);
  ctx.fill();

  // Red vertical accent bar (left)
  ctx.fillStyle = COLOR_ACCENT;
  ctx.fillRect(BAR_X, BAR_Y, BAR_W, BAR_H);

  // Message text (Setswana phrase or compliment)
  ctx.fillStyle = COLOR_TEXT;
  ctx.font = FONT_MESSAGE;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  const maxMsgWidth = SIZE - MARGIN_X * 2 - 40;
  const msgLines: string[] = [];
  for (const seg of messageText.split('\n')) {
    msgLines.push(...wrapText(ctx, seg, maxMsgWidth));
  }
  const afterMsgY = drawLines(ctx, msgLines, TEXT_CENTER_X, TEXT_START_Y, LINE_HEIGHT_MSG);

  // English translation (coffee mode only)
  let afterContentY = afterMsgY;
  if (englishText) {
    ctx.fillStyle = COLOR_ACCENT;
    ctx.font = FONT_ENGLISH;
    ctx.textAlign = 'center';
    setSpacing(ctx, '3px');
    const engLines: string[] = [];
    for (const seg of englishText.split('\n')) {
      engLines.push(...wrapText(ctx, seg.toUpperCase(), SIZE - MARGIN_X * 2));
    }
    afterContentY = drawLines(ctx, engLines, TEXT_CENTER_X, afterMsgY + ENGLISH_GAP, LINE_HEIGHT_ENG);
    setSpacing(ctx, '0px');
  }

  // Red divider line
  ctx.fillStyle = COLOR_ACCENT;
  ctx.fillRect(MARGIN_X + 80, afterContentY + DIVIDER_OFFSET, DIVIDER_W, DIVIDER_H);

  // Hashtag
  ctx.fillStyle = COLOR_ACCENT;
  ctx.font = FONT_HASHTAG;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  setSpacing(ctx, '3px');
  ctx.fillText('#GRWM', HASHTAG_X, HASHTAG_Y);
  setSpacing(ctx, '0px');
}

/**
 * Generates a 1080×1080 branded share card as a PNG Blob.
 *
 * @param messageText - Setswana phrase (coffee mode) or compliment text.
 *                      May contain \n for manual line breaks.
 * @param englishText - English translation; presence triggers the coffee card layout.
 */
export async function generateShareCard(
  messageText: string,
  englishText?: string
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  await drawCard(ctx, messageText, englishText);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas.toBlob returned null'))),
      'image/png'
    );
  });
}
