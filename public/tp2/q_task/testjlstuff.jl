using RCall

@rlibrary ggplot2


ENV["R_HOME"]="/Library/Frameworks/R.framework/Resources";
ENV["PATH"]="/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/X11/bin"

Pkg.build("RCall")

using RCall

@rlibrary ggplot2

using DataFrames
d = DataFrame(v = [3,4,5], w = [5,6,7], x = [1,2,3], y = [4,5,6], z = [1,1,2])
ggplot(d, aes(x=:x,y=:y)) + geom_line()
