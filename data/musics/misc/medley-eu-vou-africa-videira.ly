\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Medley: Eu vou (Africa) / Videira"
  %subtitle= ""
  composer= "Fernanda Brum"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  % tagline= "Como tocado em: https://youtu.be/7RK8P0r9wEo"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \mark "Prelude: Eu vou"
  \key d \major
  <<
    {
      \voiceTwo
      \clef bass
      \repeat percent 8 {d,8.^"(Kalimba)" a'16~8 c~16 a8 16 c8 16( d)}
    }\\
    {
      \voiceOne
      s1*4 \break
      \clef treble
        d'8^"(+ Pan Flute)" 16 a'~16 g c8 16 a8 16 d8 8 s1
        d,8 16 a'~16 g c8 16 a8 16 d8 8 r2 r8 d16 c d4
    }
  >>
  \bar "||" \break
  <<
    {
      \voiceTwo
      c,,8._"Tutti" d16~8 g   fis8. d16~8 c8~1~1~1
      ees8. f16~8 bes a8.   f16~8 ees8~1~1~2 des2
    }\\
    {
      \voiceOne
      r1 c'8.^"Synth Bell" d16~8 g fis8. d16~8 c8~1~1
      r1 ees8. f16~8 bes a8.   f16~8 ees8~1~2 r2
    }
  >>

  \bar "||" \break
  c,8.^"Tutti" d16~8 g   fis8. d16~8 c8
  ees8.        f16~8 bes a8.   f16~8 ees8
  fis8. gis16~8 cis a8. b16~8 e d1~1
  \break

  \mark "Intro" \bar "||"
  \repeat percent 4 {\empty \empty}

  \md \bar "||"
  \repeat percent 3 {\empty \empty} \empty \empty
  
  \repeat percent 3 {\empty \empty} \empty
  a8. gis16~8 e d2

  \repeat unfold 3 \empty
  a'8. gis16~8 e d2
  \empty \halfEmpty \improvisationOn b'4 4 \improvisationOff
  \break

  \repeat volta 2 {
    \md
    \repeat unfold 12 \empty
    \repeat percent 2 \repeat unfold 4 \empty
    \halfEmpty \improvisationOn r8 b8~8[ 8]\laissezVibrer \improvisationOff
    \empty \empty
    \break

    \md \bar "||"
    \repeat unfold 7 \empty
  }
  \alternative { 
    \volta 1 {\halfEmpty \improvisationOn b4 4 \improvisationOff}
    \volta 2 {\empty}
  }
  \break

  \md
  \repeat volta 2 {
    c8.^"tutti" d16~8 g fis8. d16~8 a c8. d16~8 g fis2
    c8. d16~8 g fis8. d16~8 a16 b
  }
  \alternative {
    \volta 1 {c8. b16~8 a~2}
    \volta 2 {c8. b16~8 a~16 fis8. g8 a}
  }
  \break
  \key b \major
  \mark "Videira" \bar "||"
  fis1 \tuplet 3/2 {d'8 8 8 8 8 8}  cis8.[ c16]~8[ b]\staccato

  \break
  \md \bar "||"
  \repeat percent 3 {
    \improvisationOn 
      r1 r2.. b8~1~2 b8. 16~8 8\staccato 
    \improvisationOff
  }

% segno 1

  r1*2
  \break

  \repeat segno 2 {

    \improvisationOn 
      r8 b8~8 8~8 8~8 8\laissezVibrer 
    \improvisationOff

    \md \bar "||"
    \repeat unfold 4 \empty
    \improvisationOn 
    r8 b8~8 8~8 8~8 8\laissezVibrer 
    \improvisationOff
    \repeat unfold 4 \empty
    \break \bar "||"

    % alt 1

    \alternative {
      \volta 1 {
        \md
        \repeat percent 3 {\empty \empty}
        \repeat unfold 4 \empty
        \improvisationOn
          \hide Stem
          b4 4 4
          \undo \hide Stem
          r8 b8~
        \improvisationOff

        \break \md \bar "||"
        \improvisationOn
          b1~1~1
        \improvisationOff
        \tuplet 3/2 {d8^"Tutti" 8 8 8 8 8}  cis8.[ c16]~8[ \improvisationOn b~] \improvisationOff

        \md \break
        \repeat volta 2 {
          \improvisationOn
            b1~1~1~2 b8. 16~8 8~
            b1~1~
          \improvisationOff
        }
        \alternative {
          \volta 1 {
            \improvisationOn
              1
            \improvisationOff
            \tuplet 3/2 {d8^"Tutti" 8 8 8 8 8}  cis8.[ c16]~8[ \improvisationOn b\laissezVibrer] \improvisationOff
          }
        }
      }
    }
  }

  \md \break
  \repeat volta 2 {
    \repeat percent 3 {\empty \empty}
    \repeat unfold 4 \empty
    \improvisationOn
      \hide Stem
      b4 4 4
      \undo \hide Stem
      r8 b8~
    \improvisationOff
  }

  \md \break
  \repeat volta 2 {
    \improvisationOn
      b1~1~1~2 b8. 16~8 8~
      b1~
    \improvisationOff
  }
  \alternative {
    \volta 1 {
      \improvisationOn
        1~1
      \improvisationOff
      \tuplet 3/2 {d8^"Tutti" 8 8 8 8 8}  cis8.[ c16]~8[ \improvisationOn b\laissezVibrer] \improvisationOff
    }
    \volta 2 {
      \improvisationOn
        b2.. b8-> \bar "|."
      \improvisationOff
    }
  }

}

harmony = \chordmode {

  % Prelude
  r1*19 g1/a~1

  % Intro
  \repeat percent 4 {d1 d2 d:sus4}

  % A
  \repeat percent 3 {d1 g} a1:sus~1
  \repeat percent 3 {b:m7 g} e1:sus4~1
  g\breve e:sus g1~2 a4 a/cis

  \repeat volta 2 {
    % B
    d1 g a:sus g d g c2 g/b a1:sus d1 g a\breve:sus
    \repeat percent 2 {e1:m7 g b:m7 a:sus}
    e2:m7~8 d4/fis g8~1~1

    % C
    d1:9 a:m7/d g/c g:m6.9/d
    d1:9 a:m7/d g/c
  }
  \alternative {
    \volta 1 {g2:m6.9/d a4 a/cis}
    \volta 2 {g1:m6.9/d}
  }

  % D
  R1*5

  % Videira
  e1/fis r2.. b8

  \repeat percent 3 {r1... b8~1. a8. e/gis b8}
  r1 r1 

  %seg

  \repeat segno 2 {
    r8 b4/dis e f:dim fis8~
    
    fis1 e b/dis cis2:m7 fis~8 b4/dis e f:dim fis8
    fis1 e b/dis cis2:m7 fis
  
  % alt 1
    \alternative {
      \volta 1 {
        \repeat percent 3 {gis1:m7 dis2:m7 e}
        gis1:m7 dis:m7 cis/f e1 fis2..:sus b8

        b1~1~1 r2.. b8~

        \repeat volta 2 {
          b1~1~1~2 a8. e/gis b8~1~1
        }
        \alternative {
          \volta 1 {b1 r2.. b8}
        }
      }
    }
  }

  \repeat volta 2 {
    \repeat percent 3 {gis1:m7 dis2:m7 e}
    gis1:m7 dis:m7 cis/f e1 fis2..:sus gis8:m7
  }

  \repeat volta 2 {
    b1~1~1~2 a8. e/gis b8~1
  }
  \alternative {
    \volta 1 {b1~1 r2.. b8}
    \volta 2 {b1}
  }
  
}

\score {
  <<
    \new ChordNames {
      \set additionalPitchPrefix = #"add"
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      %\tempo "Adagietto" 4 = 64
      \melody
    }
  >>
  \layout{}
  \midi{}
}