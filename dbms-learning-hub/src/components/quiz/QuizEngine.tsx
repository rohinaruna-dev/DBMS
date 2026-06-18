'use client';

// ============================================================
// DBMS Learning Hub – Quiz Engine (MCQ with Confetti)
// ============================================================
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  LinearProgress,
  Chip,
  alpha,
  useTheme,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { quizQuestions } from '@/data/quizData';
import { useProgressStore } from '@/store/progressStore';
import type { QuizResult, QuizSession } from '@/types';

const DIFFICULTY_COLOR = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };

export default function QuizEngine() {
  const theme = useTheme();
  const { addQuizSession } = useProgressStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [shuffled] = useState(() => [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10));
  const confettiRef = useRef<HTMLCanvasElement>(null);

  const question = shuffled[currentIndex];
  const correctCount = results.filter((r) => r.isCorrect).length;
  const progress = ((currentIndex + (submitted ? 1 : 0)) / shuffled.length) * 100;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setResults((prev) => [
      ...prev,
      {
        questionId: question.id,
        selectedIndex: selected,
        isCorrect: selected === question.correctIndex,
        timeSpent: Math.round((Date.now() - questionStartTime) / 1000),
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) {
      // Finished!
      const session: QuizSession = {
        startedAt: startTime,
        completedAt: Date.now(),
        results,
        score: results.filter((r) => r.isCorrect).length,
        totalQuestions: shuffled.length,
      };
      addQuizSession(session);
      setFinished(true);
      // Trigger confetti
      if (confettiRef.current) {
        launchConfetti(confettiRef.current);
      }
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
      setQuestionStartTime(Date.now());
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setFinished(false);
    setQuestionStartTime(Date.now());
  };

  if (finished) {
    const score = results.filter((r) => r.isCorrect).length;
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <FinishScreen
        score={score}
        total={shuffled.length}
        pct={pct}
        results={results}
        questions={shuffled}
        onRestart={handleRestart}
        confettiRef={confettiRef}
      />
    );
  }

  return (
    <Box>
      <canvas
        ref={confettiRef}
        id="quiz-confetti-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Progress bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Question {currentIndex + 1} of {shuffled.length}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={question.difficulty}
              size="small"
              sx={{
                bgcolor: alpha(DIFFICULTY_COLOR[question.difficulty], 0.15),
                color: DIFFICULTY_COLOR[question.difficulty],
                fontWeight: 700,
                height: 22,
              }}
            />
            <Chip
              label={`✅ ${correctCount} correct`}
              size="small"
              sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981', fontWeight: 700, height: 22 }}
            />
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            },
          }}
        />
      </Box>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1.5, display: 'block' }}>
              📚 {question.topic}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.5 }}>
              {question.question}
            </Typography>
          </Paper>

          {/* Options */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            {question.options.map((option, i) => {
              let borderColor = alpha(theme.palette.primary.main, 0.15);
              let bgColor = 'transparent';
              let textColor = 'text.primary';

              if (submitted) {
                if (i === question.correctIndex) {
                  borderColor = '#10b981';
                  bgColor = alpha('#10b981', 0.1);
                  textColor = '#10b981';
                } else if (i === selected && i !== question.correctIndex) {
                  borderColor = '#ef4444';
                  bgColor = alpha('#ef4444', 0.08);
                  textColor = '#ef4444';
                }
              } else if (selected === i) {
                borderColor = theme.palette.primary.main;
                bgColor = alpha(theme.palette.primary.main, 0.08);
              }

              return (
                <motion.div
                  key={i}
                  whileHover={!submitted ? { scale: 1.01 } : {}}
                  whileTap={!submitted ? { scale: 0.99 } : {}}
                >
                  <Box
                    onClick={() => !submitted && setSelected(i)}
                    role="radio"
                    aria-checked={selected === i}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && !submitted && setSelected(i)}
                    id={`option-${i}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 2.5,
                      border: `2px solid ${borderColor}`,
                      bgcolor: bgColor,
                      cursor: submitted ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: `2px solid ${borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        bgcolor: selected === i && !submitted ? theme.palette.primary.main : 'transparent',
                      }}
                    >
                      {submitted && i === question.correctIndex && (
                        <CheckCircleIcon sx={{ fontSize: '1rem', color: '#10b981' }} />
                      )}
                      {submitted && i === selected && i !== question.correctIndex && (
                        <CancelIcon sx={{ fontSize: '1rem', color: '#ef4444' }} />
                      )}
                      {(!submitted || (i !== question.correctIndex && i !== selected)) && (
                        <Typography variant="caption" fontWeight={800} color={selected === i && !submitted ? 'white' : 'text.secondary'}>
                          {String.fromCharCode(65 + i)}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" fontWeight={selected === i ? 700 : 500} sx={{ color: textColor }}>
                      {option}
                    </Typography>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <Collapse in={submitted}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: 2.5,
              border: `1px solid ${alpha(selected === question.correctIndex ? '#10b981' : '#ef4444', 0.3)}`,
              bgcolor: alpha(selected === question.correctIndex ? '#10b981' : '#ef4444', 0.06),
            }}
          >
            <Typography variant="subtitle2" fontWeight={800} color={selected === question.correctIndex ? '#10b981' : '#ef4444'} sx={{ mb: 0.5 }}>
              {selected === question.correctIndex ? '✅ Correct!' : '❌ Incorrect'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              💡 <strong>Explanation:</strong> {question.explanation}
            </Typography>
          </Paper>
        </motion.div>
      </Collapse>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {!submitted ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selected === null}
            id="quiz-submit-btn"
            sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', px: 4 }}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<NavigateNextIcon />}
            onClick={handleNext}
            id="quiz-next-btn"
            sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', px: 4 }}
          >
            {currentIndex + 1 >= shuffled.length ? '🏆 Finish Quiz' : 'Next Question'}
          </Button>
        )}
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRestart} id="quiz-restart-btn">
          Restart
        </Button>
      </Box>
    </Box>
  );
}

// ─── Finish Screen ────────────────────────────────────────────
function FinishScreen({
  score,
  total,
  pct,
  results,
  questions,
  onRestart,
  confettiRef,
}: {
  score: number;
  total: number;
  pct: number;
  results: QuizResult[];
  questions: typeof quizQuestions;
  onRestart: () => void;
  confettiRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const theme = useTheme();

  useEffect(() => {
    if (pct >= 70 && confettiRef.current) {
      launchConfetti(confettiRef.current);
    }
  }, [pct, confettiRef]);

  const grade =
    pct === 100 ? { label: '🏆 Perfect!', color: '#f59e0b' }
    : pct >= 80 ? { label: '🌟 Excellent!', color: '#10b981' }
    : pct >= 60 ? { label: '👍 Good Job!', color: '#6366f1' }
    : pct >= 40 ? { label: '📚 Keep Practicing', color: '#f59e0b' }
    : { label: '🔁 Try Again', color: '#ef4444' };

  return (
    <Box>
      <canvas
        ref={confettiRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}
      />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            textAlign: 'center',
            border: `2px solid ${alpha(grade.color, 0.3)}`,
            background: `linear-gradient(135deg, ${alpha(grade.color, 0.08)}, ${alpha(grade.color, 0.02)})`,
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: '4rem', color: grade.color, mb: 1 }} />
          <Typography variant="h3" fontWeight={900} color={grade.color} sx={{ mb: 0.5 }}>
            {grade.label}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            {score} / {total} correct
          </Typography>
          <Typography variant="h4" fontWeight={900} color={grade.color}>
            {pct}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              mt: 2,
              height: 12,
              borderRadius: 6,
              '& .MuiLinearProgress-bar': { bgcolor: grade.color },
              bgcolor: alpha(grade.color, 0.15),
            }}
          />
        </Paper>
      </motion.div>

      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={onRestart}
        fullWidth
        id="quiz-final-restart"
        sx={{ mb: 3, py: 1.5, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
      >
        Try Again
      </Button>

      {/* Results summary */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {questions.map((q, i) => {
          const r = results[i];
          if (!r) return null;
          return (
            <Box
              key={q.id}
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: `1px solid ${alpha(r.isCorrect ? '#10b981' : '#ef4444', 0.3)}`,
                bgcolor: alpha(r.isCorrect ? '#10b981' : '#ef4444', 0.05),
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
              }}
            >
              {r.isCorrect ? (
                <CheckCircleIcon sx={{ color: '#10b981', mt: 0.2, flexShrink: 0 }} />
              ) : (
                <CancelIcon sx={{ color: '#ef4444', mt: 0.2, flexShrink: 0 }} />
              )}
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Q{i + 1}: {q.question}
                </Typography>
                {!r.isCorrect && (
                  <Typography variant="caption" color="text.secondary">
                    Your answer: {q.options[r.selectedIndex]} | Correct: {q.options[q.correctIndex]}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Confetti Helper ──────────────────────────────────────────
async function launchConfetti(canvas: HTMLCanvasElement) {
  try {
    const confetti = (await import('canvas-confetti')).default;
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: object) {
      myConfetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  } catch (e) {
    // canvas-confetti optional
  }
}
