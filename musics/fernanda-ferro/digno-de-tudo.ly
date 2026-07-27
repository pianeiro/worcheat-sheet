\version "2.7.38"

#(set-default-paper-size "a5")

\header {
title = "Digno de tudo"
composer = "Fernanda Ferro"
copyright = "Como tocado em https://youtu.be/N1fVZ-2qtzQ"
}

md = \mark \default
empty = {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
%segno = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c''' {
  \repeat volta 2 {a4 g fis d e a2. a4 g fis d e1}
  \repeat volta 2 {a4 g fis d e a2. a4 g fis d e1 a4 g fis d e1 \empty \empty}
  \repeat unfold 8 \empty
  d8 e fis e d e fis e cis d cis a ~ a2
  d8 e fis e d e fis e d e d a ~ a2
}

harmony = \chordmode {
  \mark "Intro" g1 a g1 a
  \repeat segno 2 {
    \md g1 a g1 a g1 a2 d/fis g a d1
    \md d\breve a g1 a d\breve \bar "||" 
  }
  \md d1 fis:m7 b:m7 g
}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \key d \major
      \melody
    }
  >>

}