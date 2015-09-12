import R, { DOM as E} from 'react'
import GithubForkClass from 'react-github-fork-ribbon'

let GithubFork = R.createFactory(GithubForkClass)



export default R.createFactory(R.createClass({
  displayName: 'banner',
  render() {
    return E.
    div({ className: 'banner themeDark' },
      GithubFork({
        href: 'https://github.com/littlebits/www-developers',
        position: 'right',
        color: 'black',
        children: 'Fork me on Github'
      }),
      E.h1({ className: 'fontHeading' },
        'littleBits Cloud Platform'
      )
    )
  }
}))
