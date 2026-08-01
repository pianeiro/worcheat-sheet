\version "2.23.2"

#(set-default-paper-size "a5")

\header {
  title = "Teu amor não falha"
  subsubtitle = "No instrumental de Get Lucky, do Daft Punk"
  composer = "Templo Soul"
  copyright = "Como tocado em https://youtu.be/Npsfmz5PrvA"
}


md = \mark \default
empty = {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {

  \mark "Intro"
  \repeat volta 2 {
    \repeat percent 2 {
      \repeat percent 4 \empty
    }
  } \break

  \segno
  \repeat volta 2 {
    \repeat percent 2 {
      \repeat percent 4 \empty
    }
  }

  \md
  \repeat volta 2 {
    \repeat percent 2 {
      \repeat percent 4 \empty
    }
  }

  \md^"(metais)"
  \repeat volta 2 {
    \repeat percent 6 \empty
    \empty^"(coda)" \empty
  } \break

  \md
  \repeat percent 3 \empty
  \improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff
  e,16 fis a fis b4 r1 r
  \repeat percent 5 \empty
  \improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff
  e,16 fis a fis b cis r8 r1 r
  \empty^"D.S al Coda" \empty
  \break

  \coda
  \repeat percent 2 {
      \repeat percent 4 \empty
  }

  \md
  \repeat volta 2 {
    \repeat percent 2 {
      \repeat percent 4 \empty
    }
  } \break



}

harmony = \chordmode {

  % Intro, A, B, C
  \repeat unfold 4 {
    \repeat volta 2 {
      \repeat percent 2 {
        b1:m7 d:maj7 fis:m7 e
      }
    }
  }

  % D
  \repeat unfold 2 {b1:m7 d:maj7 fis:m7 e r1 r fis:m7 e}

  \repeat unfold 2 {
    \repeat volta 2 {
      \repeat percent 2 {
        b1:m7 d:maj7 fis:m7 e
      }
    }
  }
}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \key a \major
      \melody
    }
  >>

}