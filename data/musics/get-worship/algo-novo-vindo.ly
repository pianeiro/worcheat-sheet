\version "2.25.35"

#(set-default-paper-size "a5")

\header {
title = "Algo novo vindo"
composer = "Get Worship"
copyright = "Como tocado em https://youtu.be/RV3ZGs073Gc"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key ees \major

  \mark "Intro"
  \repeat percent 2 {f,8. g16~2. r4. f16 g aes8. g16~4}
  \break 

  \md
  \repeat volta 2 {
    \repeat percent 2 {f8. g16~2. r4. f16 g aes8. g16~4}
    \improvisationOn b1 \improvisationOff 
  } \alternative {
    \volta 1 {\empty}
    \volta 2 {\empty}
  }
  \improvisationOn \repeat percent 2 {\repeat unfold 4 {b8 8}} \improvisationOff
  \break

  \repeat segno 2 {

    \md
    \repeat volta 2{
      \repeat percent 3 {\improvisationOn b8-> 8 8 8-> 8 8 8-> 8 \improvisationOff}
    } \alternative {
      \volta 1 {\improvisationOn b8-> 8 8 8-> 8 8 8-> 8 \improvisationOff}
      \volta 2 {\improvisationOn b8-> 8 8 8-> 8 8 8-> \improvisationOff g16 aes} 
    } \bar "||"
    \break

    \md
    \repeat percent 3 {bes4. \improvisationOn b2 \improvisationOff g16 aes}
    bes4. \improvisationOn b8~2 \improvisationOff
    \break

    \alternative {

      \volta 1 {
        \md
          \repeat percent 2 {f8. g16~2. r4. f16 g aes8. g16~4}
          \improvisationOn b1 \improvisationOff  \empty
          \improvisationOn b8. b16~ \hide Stem b4 4 4 \undo \hide Stem \improvisationOff 
          r4. f16 g aes8. g16~4
          f8. g16~2. r4. f16 g aes8. g16~4
          \improvisationOn b1 \improvisationOff  \empty

        \improvisationOn \repeat percent 2 {\repeat unfold 4 {b8 8}} \improvisationOff
        \break
      }

      \volta 2 {
        \md
        \repeat volta 3 {
          \repeat percent 3 {bes16 f8 f16~8 bes16 f~16 f8. ees16 f ees f}
          bes16 f8 f16~8 bes16 f~16 f8. ees16 f g aes^"(3x)"
          \break
        }
      }
    
    }

  }

  \md
  \repeat volta 4 {\repeat unfold 3 \empty  s0*0^"(4x)" \empty }
  \break

  \md
  \repeat volta 2 \repeat percent 4 {ees'4 d bes f}
  \break

  \md
  \compressMMRests { R1*4 }
  \bar "||"
  \repeat percent 3 {\improvisationOn b8-> 8 8 8-> 8 8 8-> 8 \improvisationOff}
  \improvisationOn b8-> 8 8 8-> 8 8 8-> \improvisationOff g16 aes
  \bar "||"
  \break

  \md
  \repeat percent 3 {bes4. \improvisationOn b2 \improvisationOff g16 aes}
  bes4. \improvisationOn b8~2 \improvisationOff
  \break

  \md
  \repeat volta 2 {\repeat percent 4 {ees4. d8~2 c4. d8~2}}
  \break

  \md
  \repeat percent 3 {bes4. \improvisationOn b2 \improvisationOff g16 aes}
  bes4. \improvisationOn b8~2 \improvisationOff
  \break

  \md
  \repeat volta 2 {\repeat percent 3 {ees4 d bes f}}
  \alternative {
    \volta 1 {ees'4 d bes f}
    \volta 2 {\improvisationOn b1\fermata \improvisationOff}
  }
  \break

}

harmony = \chordmode {
  % Intro
  \repeat percent 2 {bes8./ees ees16~2.~2 ees8.:sus4 ees16~4}

  %A
  \repeat volta 2 {
    \repeat percent 2 {bes8./ees ees16~2.~2 ees8.:sus4 ees16~4}
    f1:m7 
  } \alternative {
    \volta 1 {aes1}
    \volta 2 {bes1}
  }
  ees1 1

  \repeat segno 2 {
    %B
    \repeat volta 2 {ees4./g f8:m7~2 ees4./g aes8~2 ees4./g f8:m7~2}
    \alternative {
      \volta 1 {ees4./g aes8~2}
      \volta 2 {ees4./g aes8~2}
    }

    %C
    ees4./g f8:m7~2 ees4./g aes8~2 ees4./g f8:m7~2 ees4./g aes8~2

    \alternative {

      \volta 1 {
        %D
        \repeat percent 2 {bes8./ees ees16~2.~2 ees8.:sus4 ees16~4} f1:m7 aes
        bes8. ees16~2.~2 ees8.:sus4 ees16~4
        bes8./ees ees16~2.~2 ees8.:sus4 ees16~4
        f1:m7 aes
        ees1 1
      }

      \volta 2 {
        \repeat volta 2 {c1:m7 bes ees/g aes}
      }
    }
  }

  \repeat volta 4 {c1:m7 bes ees/g aes}

  \repeat volta 2 {c1:m7 bes ees/g aes}

  R1*4
  ees4./g f8:m7~2 ees4./g aes8~2 ees4./g f8:m7~2 ees4./g aes8~2

  ees4./g f8:m7~2 ees4./g aes8~2 ees4./g f8:m7~2 ees4./g aes8~2

  \repeat volta 2 {ees1*8}

  ees4./g f8:m7~2 ees4./g aes8~2 ees4./g f8:m7~2 ees4./g aes8~2

  \repeat volta 2 {
    c1:m7 bes ees/g
  } \alternative {
    \volta 1 {aes}
    \volta 2 {aes}
  }


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
