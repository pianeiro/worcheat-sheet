\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Na terra como no céu / Que se abram os céus"
  %subtitle= ""
  composer= "Som do céu"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/uGf26zMHLNw"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key aes \major

  \partial 8 aes'16 ees'
  \bar "||"
  \mark "Intro"
  \appoggiatura bes8 c1~2 des4 ees ees1~2
  \improvisationOn b2 \improvisationOff
  \break

  \md
  \repeat volta 2 {
    \improvisationOn
      \repeat percent 3 {b1 2 2}
      b1 2 2
    \improvisationOff
  }
  \break

  \md \repeat volta 2 \repeat unfold 4 \empty

  \md
  \improvisationOn
    b1 2 2
  \improvisationOff
  \break

  \md
  \repeat percent 3 {\empty \empty} \empty \empty \break

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }
  \break

  \md
  \repeat percent 7 {f'16 des aes des}
  \improvisationOn b4 \improvisationOff
  \repeat percent 4 {aes'16 f c f}
  \repeat percent 4 {g ees c ees}

  \repeat percent 3 {f16 des aes des}
  \improvisationOn b8 8( \improvisationOff
  \repeat percent 3 {f'16) des aes des}
  \improvisationOn b4 \improvisationOff
  \repeat percent 4 {aes'16 f c f}
  \repeat percent 4 {g ees c ees}
  \break

  \md
  \repeat volta 2 {
    \repeat percent 3 {c16 f, aes bes}
    \improvisationOn b8 8(  \improvisationOff
    c16) f, aes bes
    \improvisationOn b8 8(  \improvisationOff
    c16) f, aes bes
    \improvisationOn b4 \improvisationOff
    \empty \empty
  }
  \break

  \repeat volta 4 {
    \repeat unfold 2 \empty
  } \alternative {
    \volta 1, 2, 3 {
      \empty \empty
    }
    \volta 4 {
      \improvisationOn
        \repeat unfold 8 {b8 8}
      \improvisationOff
    }
  }
  \break

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }

}

harmony = \chordmode {

  % Intro
  s8 aes1 1 des1/f~2 ees:6

  % A
  \repeat volta 2 {
    \repeat percent 3 {des1 aes2 aes:9}
    des1/f aes2 ees
  }

  % B
  \repeat volta 2 {des1 2. ees4 f1:m7 ees:6}

  % C
  des1 aes2 aes:9

  % D
  \repeat percent 3 {des1 aes2 aes:9}
  des1/f aes2 ees

  % E
  \repeat volta 4 {des1 2. ees4 f1:m7 ees:6}

  % F
  des1~2. ees4 f1:m7 ees2:6 c:m7
  des2. c8:m7 des8~2. ees4 f1:m7 ees:6

  % G
  \repeat volta 2 {
    des2.:maj7 ees8 des:maj7~4 ees8 des:maj7~4 ees4
    f1:m7 ees:6
  }
  \repeat volta 4 {
    des1:maj7~2. ees4 
  } \alternative {
    \volta 1, 2, 3 {f1:m7 ees:6}
    \volta 4 {f1:m7 ees:6}
  }

  % H
  \repeat volta 4 {des1:maj7 c2.:m7 ees4 f1:m7 ees:6}

  % I
  \repeat volta 4 {des1:maj7~2. ees4 f1:m7 ees:6}


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