\version "2.25.32"

#(set-default-paper-size "a5")

\header {
  title = "Outro igual não há"
  tagline = "Como tocado em: youtu.be/nNV7QMsvhsM"
  composer = "Gabriel Guedes"
  copyright = ""
}

md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key b \minor 

  \mark "Intro"
  \repeat volta 2 {b4 d cis e d2 g4 fis b2 cis8 d cis4 b1}
  \break

  \md
  \repeat unfold 8 \empty
  \break

  \md
  \repeat volta 2 \repeat unfold 3 \empty
  \alternative {
    \volta 1 {\empty}
    \volta 2 {\empty}
  }
  \break

  \md
  \improvisationOn b,1 \improvisationOff \repeat unfold 7 \empty
  \break

  \md
  \repeat volta 4 {\repeat unfold 3 {\empty}}
  \alternative {
    \volta 1,2,3 {\empty}
    \volta 4 {r4. fis'8 e fis e d}
  }
  \break

  \md
  \repeat volta 3 {
    b4~ \improvisationOn \hide Stem 4 4 4 \undo \hide Stem \improvisationOff
    \empty \empty
    r4. fis'8 e fis e d^"(3x)"
  }
  \repeat unfold 4 \empty
  \break

  \md
  \repeat unfold 7 \empty 
  \improvisationOn b1 \improvisationOff
  \break

  \md
  \repeat unfold 4 \empty
}

harmony = \chordmode {
  \repeat volta 2 {b2:m7 a/cis d e:m7 g a b1:m7}

  b1:m7 g d fis:m7 b:m7 e:m7 d a

  \repeat volta 2 {b2:m7 ais/cis d e:m7 g a}
  \alternative {
    \volta 1 {b1:m7}
    \volta 2 {e1}
  }

  b1:m7 g d fis:m7 b:m7 e:m7 d a

  \repeat volta 3 {b2:m7 ais/cis d e:m7 g a}
  \alternative {
    \volta 1,2,3 {b1:m7}
    \volta 4 {b1:m7}
  }

  \repeat volta 3 {b1:m7 b:m7 g2 a b1:m7}
  e1:m7 d g2 a b1:m7 

  g2 g/a g d g a b1:m7 g2 a b:m7 d g a e1

  g1 g e e 
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
