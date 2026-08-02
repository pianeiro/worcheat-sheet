\version "2.25.32"

#(set-default-paper-size "a5")

\header {
  title = "Vem, esta é a hora da Adoração"
  tagline = "Como tocado em: youtu.be/JbaZhUaw3iI"
  composer = "IBAB"
  copyright = ""
}

md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key d \major 

  \mark "Intro"
  \repeat volta 2 {fis2 r8 e fis g~g fis~fis e~e d~d4 \empty \empty} \break

  \md
  \repeat volta 2 \repeat unfold 7 \empty
  \alternative {
    \volta 1 {\empty}
    \volta 2 {\empty}
  }
  \empty \empty \break

  \md
  \repeat volta 2 \repeat unfold 8 \empty
  \empty
  \improvisationOn
    b8 8 8 8 8 8 8 8
  \improvisationOff 
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem b4 4 \undo \hide Stem 4 4
    \improvisationOff
    \break
    \repeat unfold 5 \empty
  } \break

  \key e \major

  \md
  \repeat volta 2 {e2 r8 fis gis a~a gis~gis fis~fis e~e4}
  \alternative {
    \volta 1{\empty \empty}
    \volta 2 {
      \improvisationOn
        b8 8 r8 b8 4 4~1
      \improvisationOff
    }
  } \empty \empty \break

  \md
  \repeat volta 2 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem b4 4 \undo \hide Stem 4 4
    \improvisationOff
    \repeat unfold 5 \empty
  } \break

  \md
  \repeat volta 2 {e2 r8 fis gis a~a gis~gis fis~fis e~e4 \empty \empty}
  \repeat unfold 6 \empty
  \improvisationOn b8 8 r8 b8 4 4~1\fermata \improvisationOff
}

harmony = \chordmode {
  \repeat volta 2 {d1 1 a:m7 e:m7}

  \repeat volta 2 {
    d1 1 d:sus4 d a:m7 a:m7 c:maj7
  } \alternative {
    \volta 1 {g}
    \volta 2 {e:m7}
  } d d

  \repeat volta 2 {
    d1 1 d:sus4 d a:m7 a:m7 c:maj7 e:m7
  } d d

  \repeat volta 2 {
    g1 b:m7 g b2:m7 a4/cis d g1 b:m7 e2:m7 g a1:sus4 a
  }

  \repeat volta 2 {e1 1}
  \alternative {
    \volta 1 {b:m7 a}
    \volta 2 {fis4.:m7 e/gis a4~1}
  } e e \break

  \repeat volta 2 {
    a1 cis:m7 a cis2:m7 b4/dis e a1 cis:m7 fis2:m7 a b1:sus4 b
  }

  \repeat volta 2 {e1 1 b:m7 a}
  e1 1 b:m7 a cis:m7 1 fis4.:m7 e/gis a4~1
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
