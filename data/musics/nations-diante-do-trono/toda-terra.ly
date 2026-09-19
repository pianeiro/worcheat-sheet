\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Toda Terra"
  %subtitle= ""
  composer= "Nations Diante do Trono"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/7RK8P0r9wEo"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key c \minor
  
  \mark "Intro" \repeat volta 2 \repeat unfold 8 \empty \break

  \repeat segno 2 {
    \md
    \repeat volta 2 {\empty \empty \emptyAnt \empty}
    \repeat percent 2 {\empty \empty}
    \break

    \md
    \repeat percent 3 {\emptyAnt \emptyAnt}
    \emptyAnt \empty
    \emptyAnt
    \improvisationOn \repeat percent 2 \repeat unfold 4 {b'8 8} \improvisationOff
  }
  \break

  \md
  \repeat volta 4 {
    \repeat unfold 7 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }
  \improvisationOn
    \repeat unfold 8 {b8 8}
  \improvisationOff
  \break

  \md
  \repeat percent 3 {\emptyAnt \emptyAnt}
  \repeat percent 2 {\emptyAnt \empty}
  \emptyAnt
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 7 \empty
    \improvisationOn
      \hide Stem
        b4 4 4^"(fade out)" 4
      \undo \hide Stem
    \improvisationOff
  }

}

harmony = \chordmode {

  % Intro
  \repeat volta 2 {c\breve:m7 aes:6 ees g:m7}

  \repeat segno 2 {
    % A
    \repeat volta 2 {c\breve:m7 aes4. ees8~2 bes1}
    \repeat percent 2 {ees2/g aes bes1}

    % B
    \repeat percent 3 {aes4. ees8~2 c4.:m7 bes8~2}
    aes4. bes8~2 c1:m7
    aes4. bes8~2 c1:m7~1
  }

  % C
  \repeat volta 4 {
    c\breve:m7 aes:6 ees g:m7
  }
  c2:m7 bes/d ees f:m7 

  % D
  \repeat percent 3 {aes4. ees8~2 c4.:m7 bes8~2}
  \repeat percent 2 {aes4. bes8~2 c1:m7} aes4. bes8~2

  % E
  \repeat volta 2 {c\breve:m7 aes:6 ees g:m7}


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