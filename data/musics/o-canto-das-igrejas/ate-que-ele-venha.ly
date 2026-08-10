\version "2.25.32"

#(set-default-paper-size "a5")

\header {
  title = "Até que ele venha"
  tagline = "Como tocado em: youtu.be/NyklgqFHlsU"
  composer = "O Canto das Igrejas"
  copyright = ""
}

md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key bes \major 

  \mark "Intro"
  \improvisationOn
  b8.^"(gtr)" b16~b8 b8~b16 b8. b8. b16 
  r4. b16 b b b r8 b16 b r8
  b8. b16~b8 b8~b16 b8. b8. b16
  r4. b16 b b4 r4
  \improvisationOff

  \md
  \repeat volta 2 {
    r1*0^"tacet 1st" 
    \repeat percent 3 {\empty \empty} \empty \empty
  } \break

  \md 
  \repeat segno 2 {
    \repeat volta 3 {
      \repeat unfold 3 \empty 
      \improvisationOn
        \hide Stem
          b4 4 4 4^"(3x)"
        \undo \hide Stem
      \improvisationOff
    } 
    \empty \empty
    \improvisationOn
      \repeat unfold 7 {b8 8} b4
    \improvisationOff 
    \break

    \md \repeat volta 2 {
      \repeat unfold 3 \empty
      \improvisationOn
        \hide Stem
          b4 4 4 4^"(4x)"
        \undo \hide Stem
      \improvisationOff
    }
    \break

    \md \repeat volta 2 \repeat unfold 4 \empty
  }

  \md 
  \repeat volta 3 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(3x)"
      \undo \hide Stem
    \improvisationOff
  }
  \improvisationOn
    \repeat unfold 12 {b8 8} b4 r2.
  \improvisationOff
  \break

  \md 
  \repeat volta 3 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(3x)"
      \undo \hide Stem
    \improvisationOff
  }
  \improvisationOn
    b1 1 1 1\fermata
  \improvisationOff
  \bar "|."
}

harmony = \chordmode {
  f4./a bes8~2~2. c4 f4./a bes8~2~2. c4

  \repeat volta 2 {
    \repeat percent 3 {g2:m7 ees bes1}
    f2/a bes bes1
  }

  \repeat segno 2 {
    \repeat volta 3 {f1:m7 c:m7 bes bes} aes1 ees/g bes bes
    \repeat volta 4 {c1:m7 ees g:m7 f}
    \repeat volta 2 {f2/a bes bes1 g2:m7 f f1} 
  }

  \repeat volta 3 {c1:m7 ees g:m7 f} c1:m7 ees g:m7 f

  \repeat volta 3 {c1:m7 ees g:m7 f} c1:m7 ees g:m7 f
}

\score {
<<
  \new ChordNames {
    \set chordChanges = ##t
    \harmony
  }
  \new Staff {
    \melody
  }
>>

}
