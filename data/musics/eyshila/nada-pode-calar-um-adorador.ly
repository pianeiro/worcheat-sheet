\version "2.25.35"

#(set-default-paper-size "a5")

\header {
  title = "Nada pode calar um adorador"
  composer = "Eyshila"
  copyright = "Como tocado em https://youtu.be/rDhJTDVZ1cI"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
groove = {\improvisationOn \hide Stem  b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key g \major

  \mark "Intro"
  b8 d16 a16~a g8 a16~a4. g16 a
  b8 d16 a16~a g8. a8 g16 fis~fis g8.
  b8 d16 a16~a g8 a16~a4 a16 g fis fis~fis8. g16~g a8 fis16~2
  b8 d16 a16~a g8 a16~a4. g16 a
  b8 d16 a16~a g8. d'8 c16 b~b a8 a16~
  a8. g16~2 fis8. e16~1
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 4 \empty
  } \alternative {
    \volta 1 {\repeat unfold 4 \empty}
    \volta 2 {\repeat unfold 4 \empty}
  } \break

  \md \bar "||" \repeat unfold 8 \empty \break

  \md \bar "||" \repeat unfold 16 \empty \break

  \md \bar "||" g2. c16( b a g a4 g'8 d d'2) \break

  \md
  \bar "||" \repeat unfold 7 \empty
  \improvisationOn
    \hide Stem b,4 4 4 \undo \hide Stem 4\caesura \bar "||"
    \repeat unfold 8 {8 8}
  \improvisationOff 
  \break

  \md \repeat volta 2 \repeat unfold 7 \empty 
  \alternative {
    \volta 1 \empty
    \volta 2 \empty
  }
  \break

  \md \bar "||"
  \repeat unfold 3 \empty
  \improvisationOn b2 2\fermata \improvisationOff
  \break

  \md \bar "||"
  b8 d16 a16~a g8 a16~a4. g16 a
  b8 d16 a16~a g8. d'8 c16 b~b a8 a16~
  a8. g16~2 fis8. e16~1\fermata
}

harmony = \chordmode {
 
  % Intro
  c1:maj7 e2:m7 d:13 c1:maj7 e:m7.9
  c1:maj7 e2:m7 d/fis a1:m7 c

  % A
  \repeat volta 2 {
    g1:9 d e:m7 c 
  } \alternative {
    \volta 1 {g2 d g c g1 d2:sus4 d}
    \volta 2 {g2 d/fis e:m7 c g1 d2:sus4 d}
  }  

  % B
  b1:m7 e:m7 d2:sus4 d c1
  d1 e:m7 a2:sus4 a a:m7 c/d  

  % C
  g1  d e:m7 c2. d4/fis
  g1 d a2:m7 g/b c c/d 
  g1 d e:m7 c2 d/fis 
  g1 d a2:m7 g/b c/e d

  % D
  g1 d:sus4

  % E
  g1/b d/fis c/e b/dis
  e2:m7 d:13 a:sus4 a 
  a:m7 g:13 d:sus4 d a:m7 g:13 c/e c4:m/ees c/d

  % F
  \repeat volta 2 {
  g1 d e:m7 c2/e d/fis 
  g1 d a2:m7 g/b
  } \alternative {
     \volta 1 {c/e c4:m/ees c/d}
     \volta 2 {c2 c/d}
  }

  % G
  a2:m7 g/b c/e c4:m/ees c/d
  a2:m7 g/b c/e c:m/ees

  %H
  c1:maj7 e2:m7 d/fis a1:m7 c

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