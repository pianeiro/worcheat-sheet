\version "2.25.35"

#(set-default-paper-size "a5")

dateTime = #(strftime "%d/%m/%Y %H:%M" (localtime (current-time)))
md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

\header {
title = "Todos os dias"
composer = "O canto das igrejas"
copyright = \markup { \concat { "Versão 1.0.0, de " \dateTime } }
tagline = "Como tocado em https://youtu.be/DH58tiF8Idw"
}

melody = \relative c'' {
  \mark "Intro"
  \repeat volta 2 {
    s1*0^"Tacet prima volta" \repeat percent 3 \empty
  } \alternative {
    \volta 1 {\empty}
    \volta 2 {
      \improvisationOn
        b8. b16~8 8~4 8-. 8-.
      \improvisationOff
    }
  }

  \break
  \md
  \repeat volta 2 {
    s1*0^"Tacet prima volta"
    \repeat percent 2 {
      \repeat unfold 4 \empty
    }
    \repeat percent 2 {
      \repeat unfold 4 \empty
    }
  }

  \break
  \md
  \repeat volta 2 \repeat unfold 4 \empty

  \break
  \md 
  \improvisationOn
    \repeat percent 2 {b8. 16~8 8  r2 4. 8~2}
    b8. 16~8 8  r2 4. 4. 4~1 \repeat percent 4 {8 8}
  \improvisationOff

  \break
  \md
  \improvisationOn 
    \repeat percent 3 {b8. 16 r2.}
    b8. 16~8 8~4 8-. 8-.
  \improvisationOff

  \break
  \mark "A2"
  \repeat volta 2 \repeat percent 4 {
    \improvisationOn
      b8.^"Synth, banda tacet prima volta" 16~8 8~16 8. 8 8
    \improvisationOff
  }
  \repeat volta 2 \repeat percent 4 \empty

  \break
  \mark "B2"
  \repeat volta 2 \repeat percent 4 \empty
  \repeat unfold 7 \empty
  \improvisationOn
    \hide Stem 
      b4 4 r2
    \undo \hide Stem
  \improvisationOff
  \repeat volta 2 \repeat percent 4 \empty

  \break
  \mark "C2"
  \improvisationOn
    \repeat percent 2 {b8. 16~8 8  r2 4. 8~2}
    b8. 16~8 8  r2 4. 4. 4~1 b1\fermata
  \improvisationOff
}

harmony = \chordmode {
  % Intro
  \repeat volta 2 {
      a1 e/gis fis:m7 
    } \alternative {
    \volta 1 {d}
    \volta 2 {d2. a4}
  }

  % A
  \repeat volta 2 {
    \repeat percent 2 {a1 a2 e/gis fis1:m7 d}
    \repeat percent 2 {e fis2:m7 cis:m7 d1 1}
  }

  % B
  \repeat volta 2 {a1 e/gis fis:m7 d}

  % C
  e1 fis4.:m7 a8~2 fis1:m7 d4. a8~2 e1 fis4.:m7 a e4~1 d1

  % D
  a1 e/gis fis:m7 d2. a4

  % A2
  \repeat volta 2 {a1 a2 e fis1:m7 d}
  \repeat volta 2 {e1 fis2:m7 cis:m7 d1 1}

  % B2
  \repeat volta 2 {a1 e/gis fis:m7  d}
  a1 e/gis fis:m7  d
  a1 e/gis fis:m7  d2 r2
  \repeat volta 2 {a1 e/gis fis:m7  d}

  % C2
  e1 fis4.:m7 a8~2 fis1:m7 d4. a8~2 e1 fis4.:m7 a e4~1 d1

}

\score {
<<
  \new ChordNames {
    \set chordChanges = ##t
    \harmony
  }
  \new Staff {
    \key a \major \melody
  }
>>

}
