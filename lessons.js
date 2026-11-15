// Curriculum for Second Nature.
// Each lesson: L(title, note, code). Lines starting with "# " or "-- " are
// shown as explanation and are not typed. Indentation is filled in for you.
const L = (t, n, c) => ({ t, n, c: c.replace(/^\n/, '').replace(/\n\s*$/, '') });
const R = String.raw;

const TRACKS = [
  {
    id: 'keys',
    name: '0 · Corne symbols',
    blurb: 'Pattern drills for the keys that live on your NUM and SYM layers.',
    lessons: [
      L('Brackets ( ) [ ] { }', 'All six brackets sit on NUM under your right ring and pinky fingers: ( ) top row, { } home row, [ ] bottom row. ( ) are also on SYM at F and G.', R`
x = [1, 2, 3]
d = {"a": 1, "b": 2}
t = (x[0], d["a"])
df[["a", "b"]]
f(g(x)[0])["key"]
{k: [v] for k, v in d.items()}
`),
      L('Underscore, equals, colon', 'On NUM: - and = on the home row at H and J, _ and + right below them. Colon is shift + ; on the base layer.', R`
my_var = 1
total_sum += my_var
row_count = len(my_list)
x_train, y_train = split(df)
if my_var == 1:
def get_user_name(user_id):
for row_id in id_list:
`),
      L('Operators', 'SYM holds the shifted number row under your left hand: ! @ # $ % on top, ^ & * ( ) on the home row. + - = * / are on NUM.', R`
a + b - c * d / e
x ** 2 // 3 % 5
a <= b != c >= d
(x > 0) & (y < 1) | ~z
n += 1; n -= 1; n *= 2
ok = not a and b or c
`),
      L('Numbers on NUM', 'Hold the left thumb for NUM: 1 to 5 on the top row, 6 to 0 on the home row, all under your left hand.', R`
n = 10
pi = 3.14159
rng = range(0, 100, 5)
sizes = [16, 32, 64, 128, 256]
lr = 0.001
shape = (28, 28, 1)
x[2:8], x[-1], x[::2]
`),
      L('Quotes and shifted keys', 'These need shift on the base layer: : " < > ? Shift is on the two outer pinky keys: use the hand that is not typing the character.', R`
name = "Ada"
msg = 'hi'
label = f"{name}: {len(name)}"
path = "data/raw/sales.csv"
q = "select * from t where x > 5"
a < b, b > a, "what?"
`),
      L('The awkward ones', 'Backslash, pipe, at, hash, dollar, tilde, caret: rare in prose, constant in code.', R`
x = a @ b
pattern = r"\d+\.\d*"
print("a\tb\n")
price = "$%.2f" % 9.5
mask = ~(a ^ b)
s = "a|b|c".split("|")
tag = "#eda"
`),
    ],
  },
  {
    id: 'py',
    name: '1 · Python core',
    blurb: 'Loops to classes: the shapes every later track is built from.',
    lessons: [
      L('for loop: the basic shape', 'for <name> in <iterable>: then an indented body. The colon is the part people forget.', R`
names = ["ada", "bob", "cy"]
for name in names:
    print(name)

total = 0
for n in [1, 2, 3]:
    total += n
print(total)
`),
      L('for loop: range and enumerate', 'range(n) gives 0..n-1. enumerate gives (index, item) pairs, so you never write range(len(x)).', R`
for i in range(5):
    print(i)

for i in range(0, 10, 2):
    print(i)

for i, name in enumerate(names):
    print(i, name)
`),
      L('for loop: zip and dicts', 'zip walks two lists in step. .items() walks a dict as (key, value) pairs.', R`
ages = [36, 41, 29]
for name, age in zip(names, ages):
    print(f"{name} is {age}")

scores = {"ada": 91, "bob": 78}
for key, value in scores.items():
    print(key, value)
`),
      L('for loop: nested, break, continue', 'continue skips to the next item, break leaves the loop. while repeats until its condition is false.', R`
for row in grid:
    for cell in row:
        if cell is None:
            continue
        if cell < 0:
            break
        print(cell)

while total < 100:
    total *= 2
`),
      L('List comprehension', 'A for loop that builds a list, on one line: [expression for item in iterable if condition].', R`
squares = [n ** 2 for n in range(10)]
evens = [n for n in range(10) if n % 2 == 0]
upper = [name.upper() for name in names]
flat = [x for row in grid for x in row]
sign = ["pos" if n > 0 else "neg" for n in nums]
`),
      L('Dict and set comprehensions', 'Same idea with braces. key: value makes a dict, a bare value makes a set.', R`
lengths = {name: len(name) for name in names}
inverse = {v: k for k, v in scores.items()}
passed = {k: v for k, v in scores.items() if v >= 80}
unique = {name[0] for name in names}
total = sum(v for v in scores.values())
`),
      L('Functions', 'Defaults go after required arguments. *args collects extra positionals, **kwargs collects extra keywords.', R`
def mean(values):
    return sum(values) / len(values)

def scale(x, factor=2.0, *, clip=None):
    y = x * factor
    return min(y, clip) if clip else y

def log(*args, **kwargs):
    print(args, kwargs)
`),
      L('lambda and sorting', 'A lambda is a one-expression function. key= tells sorted, min and max what to compare.', R`
rows = [("ada", 91), ("bob", 78), ("cy", 85)]
by_score = sorted(rows, key=lambda r: r[1])
top = max(rows, key=lambda r: r[1])
ranked = sorted(rows, key=lambda r: -r[1])[:2]
doubled = list(map(lambda x: x * 2, [1, 2, 3]))
`),
      L('try, except, with', 'with closes the file for you even when an error is raised. Catch the narrowest exception you can.', R`
try:
    value = int(text)
except ValueError as err:
    print(f"bad input: {err}")
    value = 0
finally:
    print("done")

with open("notes.txt") as f:
    lines = f.read().splitlines()
`),
      L('Classes and dataclasses', 'A dataclass writes __init__ and __repr__ for you from the type hints.', R`
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float = 0.0

    def norm(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3.0, 4.0)
`),
      L('Generators', 'yield hands back one item at a time, so a million rows never sit in memory at once.', R`
def batches(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]

for batch in batches(rows, 32):
    process(batch)

total = sum(x * x for x in range(1000))
`),
    ],
  },
  {
    id: 'pd',
    name: '2 · pandas EDA',
    blurb: 'The first twenty minutes with any new dataset.',
    lessons: [
      L('Load and look', 'The opening five lines of every analysis: shape, first rows, types, nulls, summary.', R`
import pandas as pd

df = pd.read_csv("sales.csv")
df.shape
df.head()
df.info()
df.describe()
df.isna().sum()
`),
      L('Select columns and rows', 'Key difference: loc selects by label, iloc by position. loc slices include the end, iloc slices do not.', R`
df["price"]
df[["price", "qty"]]
df.loc[0:5, ["price", "qty"]]
df.iloc[0:5, 0:2]
df.loc[df["qty"] > 10, "price"]
df.select_dtypes("number")
`),
      L('Filter rows', 'Wrap each condition in brackets and join with & or |. Python and / or do not work on columns.', R`
big = df[df["price"] > 100]
both = df[(df["price"] > 100) & (df["qty"] >= 5)]
either = df[(df["region"] == "EU") | (df["region"] == "US")]
some = df[df["region"].isin(["EU", "US"])]
rest = df[~df["region"].isin(["EU", "US"])]
q = df.query("price > 100 and qty >= 5")
`),
      L('Count and summarise', 'value_counts is the fastest way to understand a categorical column.', R`
df["region"].value_counts()
df["region"].value_counts(normalize=True)
df["region"].nunique()
df["price"].mean(), df["price"].median()
df["price"].quantile([0.25, 0.5, 0.75])
df.describe(include="object")
df.corr(numeric_only=True)
`),
      L('groupby: one aggregate', 'Split by a key, apply an aggregate, combine. The result is indexed by the key.', R`
df.groupby("region")["price"].mean()
df.groupby("region")["qty"].sum()
df.groupby("region").size()
df.groupby(["region", "product"])["price"].mean()
df.groupby("region")["price"].mean().sort_values()
`),
      L('groupby: named aggregates', 'Named aggregation gives you tidy column names: new_name=(column, function).', R`
summary = (
    df.groupby("region")
    .agg(
        orders=("order_id", "count"),
        revenue=("price", "sum"),
        avg_qty=("qty", "mean"),
    )
    .reset_index()
)
`),
      L('transform vs agg', 'Key difference: agg returns one row per group, transform returns one row per original row.', R`
df["region_avg"] = df.groupby("region")["price"].transform("mean")
df["vs_avg"] = df["price"] - df["region_avg"]
df["share"] = df["price"] / df.groupby("region")["price"].transform("sum")
df["rank"] = df.groupby("region")["price"].rank(ascending=False)
`),
      L('pivot_table and crosstab', 'pivot_table aggregates values into a grid. crosstab counts combinations of two categoricals.', R`
pd.pivot_table(
    df,
    index="region",
    columns="product",
    values="price",
    aggfunc="sum",
    fill_value=0,
)
pd.crosstab(df["region"], df["product"], normalize="index")
`),
      L('merge', 'how= decides which keys survive: inner keeps matches, left keeps every left row. validate= catches surprise duplicates.', R`
orders = df.merge(customers, on="customer_id", how="left")
joined = df.merge(
    products,
    left_on="product",
    right_on="name",
    how="inner",
    validate="many_to_one",
)
both = pd.concat([df_2023, df_2024], ignore_index=True)
`),
      L('Sort and top-n', 'nlargest is shorter and faster than sort_values().head().', R`
df.sort_values("price", ascending=False).head(10)
df.sort_values(["region", "price"], ascending=[True, False])
df.nlargest(5, "price")
df.nsmallest(5, "price")
df.groupby("region")["price"].nlargest(3)
df.sample(5, random_state=0)
`),
      L('Method chaining', 'One readable pipeline, no leftover variables. assign adds columns, query filters, pipe calls your own function.', R`
result = (
    df.query("qty > 0")
    .assign(revenue=lambda d: d["price"] * d["qty"])
    .groupby("region", as_index=False)["revenue"]
    .sum()
    .sort_values("revenue", ascending=False)
    .head(10)
)
`),
      L('Time series basics', 'With a datetime index, resample is groupby for time: "D" day, "W" week, "ME" month end.', R`
df["date"] = pd.to_datetime(df["date"])
ts = df.set_index("date").sort_index()
monthly = ts["price"].resample("ME").sum()
rolling = ts["price"].rolling(7).mean()
change = monthly.pct_change()
ts.loc["2024-01":"2024-03"]
`),
    ],
  },
  {
    id: 'clean',
    name: '3 · Data cleaning',
    blurb: 'Nulls, types, strings, dates, duplicates, outliers.',
    lessons: [
      L('Find and fill nulls', 'Look before you fill. dropna removes rows, fillna replaces values.', R`
df.isna().sum()
df.isna().mean().sort_values(ascending=False)
df = df.dropna(subset=["price"])
df["qty"] = df["qty"].fillna(0)
df["region"] = df["region"].fillna("unknown")
df["price"] = df["price"].fillna(df["price"].median())
df["temp"] = df["temp"].ffill()
`),
      L('Fix dtypes', 'Key difference: astype raises on bad values, to_numeric with errors="coerce" turns them into NaN.', R`
df.dtypes
df["qty"] = df["qty"].astype("int64")
df["price"] = pd.to_numeric(df["price"], errors="coerce")
df["region"] = df["region"].astype("category")
df["active"] = df["active"].map({"yes": True, "no": False})
df = df.convert_dtypes()
`),
      L('Clean strings', 'Everything text-related lives behind the .str accessor and works on the whole column.', R`
df["name"] = df["name"].str.strip().str.lower()
df["code"] = df["code"].str.replace("-", "", regex=False)
df["digits"] = df["phone"].str.replace(r"\D", "", regex=True)
df["domain"] = df["email"].str.split("@").str[1]
df["is_pro"] = df["plan"].str.contains("pro", case=False, na=False)
df["zip"] = df["zip"].str.zfill(5)
`),
      L('Parse dates', 'Once a column is datetime, the .dt accessor gives you year, month, weekday and more.', R`
df["date"] = pd.to_datetime(df["date"], format="%Y-%m-%d")
df["when"] = pd.to_datetime(df["when"], errors="coerce")
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.to_period("M")
df["weekday"] = df["date"].dt.day_name()
df["age_days"] = (pd.Timestamp.today() - df["date"]).dt.days
`),
      L('Duplicates', 'Always count duplicates before dropping them, and say which columns define a duplicate.', R`
df.duplicated().sum()
df.duplicated(subset=["order_id"]).sum()
df[df.duplicated(subset=["order_id"], keep=False)]
df = df.drop_duplicates()
df = df.drop_duplicates(subset=["order_id"], keep="last")
df = df.reset_index(drop=True)
`),
      L('Outliers with the IQR rule', 'Anything beyond 1.5 IQRs from the quartiles is flagged. clip caps values instead of dropping rows.', R`
q1, q3 = df["price"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["price"] < low) | (df["price"] > high)]
df["price_capped"] = df["price"].clip(low, high)
z = (df["price"] - df["price"].mean()) / df["price"].std()
`),
      L('Rename, replace, bin', 'cut makes bins of equal width, qcut makes bins with equal numbers of rows.', R`
df = df.rename(columns={"Unit Price": "price", "Qty": "qty"})
df.columns = df.columns.str.lower().str.replace(" ", "_")
df["region"] = df["region"].replace({"U.S.": "US", "usa": "US"})
df["band"] = pd.cut(df["price"], bins=[0, 10, 100, 1000])
df["quartile"] = pd.qcut(df["price"], q=4, labels=False)
df = df.drop(columns=["notes"])
`),
      L('Reshape: wide to long and back', 'melt turns columns into rows (long). pivot turns rows back into columns (wide).', R`
long = df.melt(
    id_vars=["region"],
    value_vars=["q1", "q2", "q3", "q4"],
    var_name="quarter",
    value_name="sales",
)
wide = long.pivot(index="region", columns="quarter", values="sales")
wide = wide.reset_index()
`),
    ],
  },
  {
    id: 'pl',
    name: '4 · polars EDA',
    blurb: 'The same EDA moves in polars, and where it differs from pandas.',
    lessons: [
      L('Load and look', 'Key difference from pandas: no index, and every column has one strict type.', R`
import polars as pl

df = pl.read_csv("sales.csv")
df.shape
df.head()
df.schema
df.describe()
df.null_count()
`),
      L('select and filter', 'Key difference: you describe columns with pl.col expressions instead of indexing with brackets.', R`
df.select("price", "qty")
df.select(pl.col("price"), pl.col("qty") * 2)
df.filter(pl.col("price") > 100)
df.filter((pl.col("price") > 100) & (pl.col("qty") >= 5))
df.filter(pl.col("region").is_in(["EU", "US"]))
df.select(pl.col(pl.Float64))
`),
      L('with_columns', 'pandas: df["x"] = ... changes df in place. polars: with_columns returns a new frame, alias names the result.', R`
df = df.with_columns(
    (pl.col("price") * pl.col("qty")).alias("revenue"),
    pl.col("name").str.to_lowercase(),
    pl.col("qty").cast(pl.Int64),
)
df = df.with_columns(revenue_k=pl.col("revenue") / 1000)
df = df.rename({"name": "product"})
`),
      L('Count and summarise', 'Expressions work on many columns at once: pl.all(), or a list of names.', R`
df["region"].value_counts(sort=True)
df["region"].n_unique()
df.select(pl.col("price").mean(), pl.col("qty").sum())
df.select(pl.col("price", "qty").median())
df.select(pl.all().null_count())
df.sort("price", descending=True).head(10)
df.top_k(5, by="price")
`),
      L('group_by and agg', 'Key difference: it is group_by with an underscore, and agg takes expressions, so names are explicit.', R`
summary = (
    df.group_by("region")
    .agg(
        pl.len().alias("orders"),
        pl.col("revenue").sum(),
        pl.col("qty").mean().alias("avg_qty"),
    )
    .sort("revenue", descending=True)
)
`),
      L('when, then, otherwise', 'The polars version of np.where and if/else on a column.', R`
df = df.with_columns(
    pl.when(pl.col("price") > 100)
    .then(pl.lit("high"))
    .when(pl.col("price") > 10)
    .then(pl.lit("mid"))
    .otherwise(pl.lit("low"))
    .alias("band")
)
`),
      L('Window functions with over', 'over is the polars answer to pandas transform: a group result on every original row.', R`
df = df.with_columns(
    pl.col("price").mean().over("region").alias("region_avg"),
    pl.col("price").rank(descending=True).over("region").alias("rank"),
    (pl.col("revenue") / pl.col("revenue").sum().over("region"))
    .alias("share"),
)
`),
      L('Joins and concat', 'Same idea as merge. There is no index, so on= is always a column.', R`
orders = df.join(customers, on="customer_id", how="left")
joined = df.join(
    products,
    left_on="product",
    right_on="name",
    how="inner",
)
missing = df.join(customers, on="customer_id", how="anti")
both = pl.concat([df_2023, df_2024])
`),
      L('Nulls, strings and dates', 'Namespaces mirror pandas accessors: .str for text, .dt for dates.', R`
df = df.drop_nulls(subset=["price"])
df = df.with_columns(
    pl.col("qty").fill_null(0),
    pl.col("name").str.strip_chars().str.to_lowercase(),
    pl.col("date").str.to_date("%Y-%m-%d"),
)
df = df.with_columns(pl.col("date").dt.year().alias("year"))
df = df.unique(subset=["order_id"], keep="last")
`),
      L('Lazy queries', 'scan_csv reads nothing until collect. Polars then plans the whole query and only loads what it needs.', R`
lazy = (
    pl.scan_csv("sales.csv")
    .filter(pl.col("qty") > 0)
    .group_by("region")
    .agg(pl.col("price").sum().alias("revenue"))
    .sort("revenue", descending=True)
)
print(lazy.explain())
result = lazy.collect()
`),
      L('pivot and unpivot', 'pivot makes a frame wide, unpivot makes it long (pandas calls that melt).', R`
wide = df.pivot(
    on="quarter",
    index="region",
    values="sales",
    aggregate_function="sum",
)
long = wide.unpivot(index="region", variable_name="quarter")
pdf = df.to_pandas()
back = pl.from_pandas(pdf)
`),
    ],
  },
  {
    id: 'sql',
    name: '5 · SQL with DuckDB',
    blurb: 'SQL run straight on files and DataFrames. Keywords are lowercase to keep you off shift.',
    lessons: [
      L('Query a file', 'DuckDB runs inside your Python process and can read a CSV or Parquet file as if it were a table.', R`
import duckdb

duckdb.sql("select * from 'sales.csv' limit 5").show()
duckdb.sql("describe select * from 'sales.csv'")
duckdb.sql("summarize select * from 'sales.csv'")
duckdb.sql("select count(*) from 'data/*.parquet'")
`),
      L('select, where, order by', 'The order you write is select, from, where, order by, limit. Strings take single quotes.', R`
duckdb.sql("""
    select order_id, region, price * qty as revenue
    from 'sales.csv'
    where price > 100
      and region in ('EU', 'US')
    order by revenue desc
    limit 10
""")
`),
      L('group by and having', 'Key difference: where filters rows before grouping, having filters groups after.', R`
duckdb.sql("""
    select
        region,
        count(*) as orders,
        sum(price * qty) as revenue,
        avg(qty) as avg_qty
    from 'sales.csv'
    group by region
    having count(*) >= 10
    order by revenue desc
""")
`),
      L('Joins', 'left join keeps every row from the left table. Rows with no match get nulls on the right.', R`
duckdb.sql("""
    select o.order_id, c.name, o.price
    from orders as o
    left join customers as c
        on o.customer_id = c.customer_id
    where c.name is not null
""")
`),
      L('case when and coalesce', 'case is if/else inside a query. coalesce returns the first value that is not null.', R`
duckdb.sql("""
    select
        order_id,
        coalesce(region, 'unknown') as region,
        case
            when price > 100 then 'high'
            when price > 10 then 'mid'
            else 'low'
        end as band
    from orders
""")
`),
      L('CTEs', 'with names a step so you can build a query top to bottom instead of nesting it.', R`
duckdb.sql("""
    with revenue as (
        select region, sum(price * qty) as total
        from orders
        group by region
    )
    select region, total, total / sum(total) over () as share
    from revenue
    order by share desc
""")
`),
      L('Window functions', 'A window function computes across related rows without collapsing them. partition by is its group by.', R`
duckdb.sql("""
    select
        order_id,
        region,
        price,
        avg(price) over (partition by region) as region_avg,
        row_number() over (
            partition by region order by price desc
        ) as rn
    from orders
""")
`),
      L('qualify and dates', 'qualify filters on a window function, so top-n per group needs no subquery.', R`
duckdb.sql("""
    select
        date_trunc('month', order_date) as month,
        region,
        sum(price) as revenue
    from orders
    group by all
    qualify row_number() over (
        partition by month order by revenue desc
    ) <= 3
""")
`),
      L('SQL on DataFrames', 'DuckDB sees pandas and polars frames by variable name. .df() gives pandas back, .pl() gives polars.', R`
df = pd.read_csv("sales.csv")
top = duckdb.sql("""
    select region, sum(price) as revenue
    from df
    group by region
""").df()
as_polars = duckdb.sql("select * from df where qty > 5").pl()
`),
      L('A database file and exports', 'connect opens a database on disk. copy writes a query result straight to Parquet.', R`
con = duckdb.connect("shop.duckdb")
con.sql("create table orders as select * from 'sales.csv'")
con.sql("select count(*) from orders").fetchone()
con.sql("""
    copy (select * from orders where qty > 0)
    to 'clean.parquet' (format parquet)
""")
con.close()
`),
    ],
  },
  {
    id: 'mpl',
    name: '6 · matplotlib',
    blurb: 'One chart type at a time, always through fig, ax.',
    lessons: [
      L('Line chart', 'Start every chart with fig, ax = plt.subplots(). Everything after is a method on ax.', R`
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(df["date"], df["price"])
ax.set_title("Price over time")
ax.set_xlabel("Date")
ax.set_ylabel("Price")
plt.show()
`),
      L('Bar chart', 'bar draws vertical bars, barh horizontal. Use barh when the category labels are long.', R`
by_region = df.groupby("region")["revenue"].sum().sort_values()

fig, ax = plt.subplots()
ax.barh(by_region.index, by_region.values, color="steelblue")
ax.set_xlabel("Revenue")
ax.bar_label(ax.containers[0], fmt="%.0f")
plt.show()
`),
      L('Histogram', 'A histogram shows the shape of one numeric column. bins controls how fine the picture is.', R`
fig, ax = plt.subplots()
ax.hist(df["price"], bins=30, edgecolor="white")
ax.axvline(df["price"].mean(), color="red", linestyle="--")
ax.set_xlabel("Price")
ax.set_ylabel("Count")
plt.show()
`),
      L('Scatter plot', 'Two numeric columns against each other. alpha makes overlapping points readable.', R`
fig, ax = plt.subplots()
sc = ax.scatter(
    df["qty"], df["price"],
    c=df["revenue"], s=20, alpha=0.6, cmap="viridis",
)
fig.colorbar(sc, label="Revenue")
ax.set_xscale("log")
plt.show()
`),
      L('pyplot vs axes style', 'Key difference: plt.title acts on the current chart, ax.set_title on one you name. Use ax once there is more than one.', R`
plt.plot(x, y)
plt.title("pyplot style")
plt.show()

fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title("axes style")
plt.show()
`),
      L('Subplots', 'subplots(rows, cols) returns an array of axes. Index it like a grid.', R`
fig, axes = plt.subplots(1, 2, figsize=(10, 4), sharey=True)
axes[0].hist(df["price"], bins=30)
axes[0].set_title("Price")
axes[1].hist(df["qty"], bins=30)
axes[1].set_title("Quantity")
fig.suptitle("Distributions")
fig.tight_layout()
`),
      L('Several lines and a legend', 'Call plot once per series with a label, then ax.legend() draws the key.', R`
fig, ax = plt.subplots()
for region, group in df.groupby("region"):
    ax.plot(group["date"], group["price"], label=region)
ax.legend(title="Region", loc="upper left")
ax.grid(alpha=0.3)
ax.spines[["top", "right"]].set_visible(False)
`),
      L('Box plot and heatmap', 'A box plot compares distributions across groups. imshow turns a matrix into a heatmap.', R`
groups = [g["price"].values for _, g in df.groupby("region")]
fig, ax = plt.subplots()
ax.boxplot(groups)

corr = df.corr(numeric_only=True)
fig, ax = plt.subplots()
im = ax.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
fig.colorbar(im)
`),
      L('Annotate and save', 'savefig writes the file. dpi sets sharpness, bbox_inches="tight" trims the margins.', R`
ax.annotate(
    "peak",
    xy=(x_max, y_max),
    xytext=(x_max, y_max * 1.1),
    arrowprops={"arrowstyle": "->"},
)
ax.set_ylim(0, None)
fig.savefig("chart.png", dpi=200, bbox_inches="tight")
`),
    ],
  },
  {
    id: 'px',
    name: '7 · plotly',
    blurb: 'The same charts, interactive, and how plotly differs from matplotlib.',
    lessons: [
      L('Line chart', 'Key difference from matplotlib: you pass the DataFrame and column names, and the chart is interactive.', R`
import plotly.express as px

fig = px.line(df, x="date", y="price", title="Price over time")
fig.show()

fig = px.line(df, x="date", y="price", color="region")
fig.show()
`),
      L('Bar chart', 'matplotlib needed a loop per group. In plotly, color= splits the bars and builds the legend.', R`
fig = px.bar(
    summary,
    x="region",
    y="revenue",
    color="product",
    barmode="group",
    text_auto=".2s",
)
fig.show()
`),
      L('Histogram and box', 'marginal= adds a second small chart on the edge, something matplotlib needs a subplot grid for.', R`
fig = px.histogram(df, x="price", nbins=30, marginal="box")
fig.show()

fig = px.box(df, x="region", y="price", points="outliers")
fig.show()

fig = px.violin(df, x="region", y="price", box=True)
`),
      L('Scatter with hover', 'color, size and hover_data each map another column onto the same chart.', R`
fig = px.scatter(
    df,
    x="qty",
    y="price",
    color="region",
    size="revenue",
    hover_data=["order_id", "product"],
    log_x=True,
    trendline="ols",
)
`),
      L('Facets', 'facet_col makes one small chart per category, the plotly answer to plt.subplots.', R`
fig = px.histogram(
    df,
    x="price",
    facet_col="region",
    facet_col_wrap=2,
    color="region",
)
fig.update_yaxes(matches=None)
fig.show()
`),
      L('update_layout', 'Styling happens after creation: update_layout for the figure, update_traces for the marks.', R`
fig.update_layout(
    title="Revenue by region",
    xaxis_title="Region",
    yaxis_title="Revenue",
    template="plotly_white",
    legend_title_text="Product",
)
fig.update_traces(marker_line_width=0)
fig.write_html("chart.html")
`),
      L('graph_objects', 'px is the quick way. go builds a figure trace by trace when you need full control.', R`
import plotly.graph_objects as go

fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y=y, mode="lines", name="actual"))
fig.add_trace(go.Scatter(x=x, y=y_hat, mode="markers", name="fit"))
fig.add_hline(y=0, line_dash="dash")
fig.show()
`),
      L('Subplots', 'make_subplots is the plotly version of plt.subplots. Each trace is placed by row and col.', R`
from plotly.subplots import make_subplots

fig = make_subplots(rows=1, cols=2, subplot_titles=["Price", "Qty"])
fig.add_trace(go.Histogram(x=df["price"]), row=1, col=1)
fig.add_trace(go.Histogram(x=df["qty"]), row=1, col=2)
fig.update_layout(showlegend=False)
fig.show()
`),
      L('Heatmap', 'imshow exists in both libraries. In plotly, text_auto prints the numbers in the cells.', R`
corr = df.corr(numeric_only=True)
fig = px.imshow(
    corr,
    text_auto=".2f",
    color_continuous_scale="RdBu_r",
    zmin=-1,
    zmax=1,
)
fig.show()
`),
    ],
  },
  {
    id: 'scipy',
    name: '8 · scipy',
    blurb: 'A tour of the modules: what each one is for, by its most-used call.',
    lessons: [
      L('The map of scipy', 'One import per module. The comment says what you reach for it to do.', R`
# stats: tests and distributions
from scipy import stats
# optimize: minimise, fit, find roots
from scipy import optimize
# interpolate: fill between points
from scipy import interpolate
# signal: filter and find peaks
from scipy import signal
# linalg, integrate, spatial, cluster, sparse
from scipy import linalg, integrate, spatial, cluster, sparse
`),
      L('stats: compare two groups', 'ttest_ind compares two means. equal_var=False is the Welch test, the safer default.', R`
a = df[df["group"] == "A"]["value"]
b = df[df["group"] == "B"]["value"]

t, p = stats.ttest_ind(a, b, equal_var=False)
print(f"t={t:.2f}, p={p:.4f}")

u, p = stats.mannwhitneyu(a, b)
`),
      L('stats: normality and correlation', 'Key difference: pearsonr measures straight-line association, spearmanr any steadily rising or falling one.', R`
w, p = stats.shapiro(a)
r, p = stats.pearsonr(df["qty"], df["price"])
rho, p = stats.spearmanr(df["qty"], df["price"])

table = pd.crosstab(df["region"], df["band"])
chi2, p, dof, expected = stats.chi2_contingency(table)
`),
      L('stats: distributions', 'Every distribution has the same methods: pdf density, cdf probability below x, ppf its inverse, rvs samples.', R`
dist = stats.norm(loc=100, scale=15)
dist.pdf(100)
dist.cdf(130)
dist.ppf(0.975)
sample = dist.rvs(size=1000, random_state=0)
low, high = stats.norm.interval(0.95, loc=100, scale=15)
slope, intercept, r, p, se = stats.linregress(x, y)
`),
      L('optimize: minimise a function', 'Give minimize a function and a starting guess. The answer is in result.x.', R`
def loss(params):
    a, b = params
    return (a - 3) ** 2 + (b + 1) ** 2

result = optimize.minimize(loss, x0=[0.0, 0.0])
result.x, result.fun, result.success

root = optimize.brentq(lambda x: x ** 3 - 2, 0, 2)
`),
      L('optimize: fit a curve', 'curve_fit finds the parameters of your model that best match the data.', R`
def model(x, a, b, c):
    return a * np.exp(-b * x) + c

params, cov = optimize.curve_fit(model, x, y, p0=[1.0, 0.1, 0.0])
a, b, c = params
errors = np.sqrt(np.diag(cov))
y_fit = model(x, *params)
`),
      L('interpolate', 'Build a function from known points, then call it at new x values.', R`
f = interpolate.interp1d(x, y, kind="linear")
y_new = f(x_new)

spline = interpolate.CubicSpline(x, y)
y_smooth = spline(x_new)
slope = spline(x_new, 1)
`),
      L('signal', 'savgol_filter smooths without flattening peaks. find_peaks returns the positions of local maxima.', R`
smooth = signal.savgol_filter(y, window_length=11, polyorder=3)
peaks, props = signal.find_peaks(smooth, height=0.5, distance=20)

b, a = signal.butter(4, 0.1, btype="low")
filtered = signal.filtfilt(b, a, y)
detrended = signal.detrend(y)
`),
      L('linalg and integrate', 'linalg solves matrix problems. quad integrates a function between two limits.', R`
x = linalg.solve(A, b)
inv = linalg.inv(A)
values, vectors = linalg.eig(A)
U, s, Vt = linalg.svd(A)

area, err = integrate.quad(lambda x: x ** 2, 0, 1)
area = integrate.trapezoid(y, x)
`),
      L('spatial, cluster, sparse', 'Distances, hierarchical clusters, and matrices that are mostly zeros.', R`
dist = spatial.distance.cdist(X, centers, metric="euclidean")
tree = spatial.KDTree(X)
d, idx = tree.query(point, k=5)

Z = cluster.hierarchy.linkage(X, method="ward")
labels = cluster.hierarchy.fcluster(Z, t=3, criterion="maxclust")

M = sparse.csr_matrix(dense)
`),
    ],
  },
  {
    id: 'sk',
    name: '9 · scikit-learn',
    blurb: 'Split, fit, predict, score; then pipelines and tuning.',
    lessons: [
      L('Split, fit, predict', 'Every model follows these four lines. Only the class name changes.', R`
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X = df[["qty", "discount"]]
y = df["price"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
`),
      L('Scaling', 'Key difference: fit_transform on train learns the scale. Use only transform on test, or you leak information.', R`
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)
scaler.mean_, scaler.scale_
`),
      L('Classification and metrics', 'predict gives labels, predict_proba gives probabilities. AUC needs the probabilities.', R`
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, roc_auc_score

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)
proba = clf.predict_proba(X_test)[:, 1]
accuracy_score(y_test, pred), roc_auc_score(y_test, proba)
`),
      L('Read the errors', 'Accuracy hides which class you get wrong. The report shows precision and recall per class.', R`
from sklearn.metrics import classification_report, confusion_matrix

print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred))

from sklearn.metrics import mean_absolute_error, r2_score
mean_absolute_error(y_test, pred), r2_score(y_test, pred)
`),
      L('Trees and forests', 'A forest averages many trees. feature_importances_ ranks the columns it leaned on.', R`
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=300, max_depth=8, random_state=0)
rf.fit(X_train, y_train)
importance = pd.Series(rf.feature_importances_, index=X.columns)
importance.sort_values(ascending=False).head(10)
`),
      L('Pipeline', 'A pipeline chains steps into one model, so scaling is fitted only on training folds.', R`
from sklearn.pipeline import make_pipeline

pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000),
)
pipe.fit(X_train, y_train)
pipe.score(X_test, y_test)
`),
      L('ColumnTransformer', 'Numbers and categories need different preparation. ColumnTransformer routes each column to its step.', R`
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

prep = ColumnTransformer([
    ("num", StandardScaler(), ["qty", "discount"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["region"]),
])
model = make_pipeline(prep, RandomForestClassifier())
model.fit(X_train, y_train)
`),
      L('Cross-validation', 'One split can be lucky. cv=5 trains five times on different folds and gives five scores.', R`
from sklearn.model_selection import cross_val_score

scores = cross_val_score(pipe, X, y, cv=5, scoring="roc_auc")
print(f"{scores.mean():.3f} +/- {scores.std():.3f}")
`),
      L('Grid search', 'Parameter names in a pipeline are step__parameter, with two underscores.', R`
from sklearn.model_selection import GridSearchCV

grid = GridSearchCV(
    pipe,
    param_grid={"logisticregression__C": [0.01, 0.1, 1, 10]},
    cv=5,
    scoring="roc_auc",
)
grid.fit(X_train, y_train)
grid.best_params_, grid.best_score_
`),
      L('Clustering and PCA', 'No y here. KMeans groups rows, PCA squeezes many columns into a few.', R`
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

km = KMeans(n_clusters=4, n_init=10, random_state=0)
labels = km.fit_predict(X_scaled)

pca = PCA(n_components=2)
coords = pca.fit_transform(X_scaled)
pca.explained_variance_ratio_
`),
    ],
  },
  {
    id: 'torch',
    name: '10 · PyTorch networks',
    blurb: 'From one tensor to a CNN and the training loop you will type a thousand times.',
    lessons: [
      L('Tensors', 'A tensor is an array that can live on a GPU and remember how it was computed.', R`
import torch

x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
x.shape, x.dtype
zeros = torch.zeros(3, 4)
noise = torch.randn(3, 4)
y = x @ x.T
flat = x.view(-1)
`),
      L('Autograd', 'requires_grad=True tracks the maths. backward() fills .grad with the slope of the loss.', R`
w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(0.5, requires_grad=True)

y = w * 3.0 + b
loss = (y - 10.0) ** 2
loss.backward()
w.grad, b.grad
`),
      L('The simplest network', 'One linear layer is y = Wx + b. Here, 3 inputs go to 1 output.', R`
from torch import nn

model = nn.Linear(in_features=3, out_features=1)
x = torch.randn(8, 3)
out = model(x)
out.shape
model.weight, model.bias
`),
      L('A multi-layer network', 'Stack layers with a non-linearity between them, or the stack collapses into one linear layer.', R`
model = nn.Sequential(
    nn.Linear(20, 64),
    nn.ReLU(),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.Linear(32, 1),
)
n_params = sum(p.numel() for p in model.parameters())
`),
      L('nn.Module', 'The standard shape: build layers in __init__, wire them together in forward.', R`
class MLP(nn.Module):
    def __init__(self, n_in, n_hidden, n_out):
        super().__init__()
        self.fc1 = nn.Linear(n_in, n_hidden)
        self.fc2 = nn.Linear(n_hidden, n_out)
        self.drop = nn.Dropout(0.2)

    def forward(self, x):
        x = self.drop(torch.relu(self.fc1(x)))
        return self.fc2(x)
`),
      L('One training step', 'Five lines, always in this order: zero the gradients, predict, measure, backpropagate, step.', R`
loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

optimizer.zero_grad()
pred = model(X)
loss = loss_fn(pred, y)
loss.backward()
optimizer.step()
`),
      L('DataLoader', 'A DataLoader hands you shuffled mini-batches so the whole dataset never has to fit at once.', R`
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(X_train, y_train)
loader = DataLoader(dataset, batch_size=32, shuffle=True)

for xb, yb in loader:
    print(xb.shape, yb.shape)
    break
`),
      L('The training loop', 'An epoch is one pass over the data. This loop is the one to know by heart.', R`
for epoch in range(10):
    model.train()
    total = 0.0
    for xb, yb in loader:
        optimizer.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        optimizer.step()
        total += loss.item()
    print(f"epoch {epoch}: {total / len(loader):.4f}")
`),
      L('Evaluate', 'Key difference: model.eval() turns off dropout, torch.no_grad() turns off gradient tracking. You want both.', R`
model.eval()
correct = 0
with torch.no_grad():
    for xb, yb in test_loader:
        logits = model(xb)
        pred = logits.argmax(dim=1)
        correct += (pred == yb).sum().item()
accuracy = correct / len(test_loader.dataset)
`),
      L('A convolutional network', 'Conv layers find local patterns, pooling halves the image, a linear layer makes the final call.', R`
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.head = nn.Linear(32 * 7 * 7, 10)

    def forward(self, x):
        return self.head(self.features(x).flatten(1))
`),
      L('Device, save, load', 'Model and data must be on the same device. Save the state_dict, not the whole object.', R`
device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)
xb, yb = xb.to(device), yb.to(device)

torch.save(model.state_dict(), "model.pt")
model.load_state_dict(torch.load("model.pt"))
`),
    ],
  },
  {
    id: 'mo',
    name: '11 · marimo notebooks',
    blurb: 'Reactive notebooks: move a slider and every cell that depends on it reruns.',
    lessons: [
      L('How a marimo notebook is stored', 'A notebook is a plain Python file. Each cell is a function: what it returns is what other cells can use.', R`
import marimo

app = marimo.App(width="medium")

@app.cell
def _():
    import marimo as mo
    return (mo,)

if __name__ == "__main__":
    app.run()
`),
      L('Markdown with live values', 'mo.md renders markdown. An f-string puts live Python values into the text.', R`
import marimo as mo

mo.md("# Sales explorer")
mo.md(f"Loaded **{len(df):,}** rows from {df['region'].nunique()} regions")
mo.md(
    f"""
    - mean price: {df["price"].mean():.2f}
    - total qty: {df["qty"].sum()}
    """
)
`),
      L('A slider', 'Key rule: create the element in one cell and read .value in another. Moving it reruns every cell that reads it.', R`
# cell 1: create and show the slider
min_price = mo.ui.slider(start=0, stop=500, step=10, value=100,
                         label="Minimum price")
min_price

# cell 2: reruns whenever the slider moves
filtered = df[df["price"] >= min_price.value]
mo.md(f"{len(filtered)} orders above {min_price.value}")
`),
      L('Dropdowns and other inputs', 'Every input works the same way: build it, show it, read .value somewhere else.', R`
region = mo.ui.dropdown(
    options=sorted(df["region"].unique()),
    value="EU",
    label="Region",
)
show_all = mo.ui.checkbox(label="Show all rows")
search = mo.ui.text(placeholder="Search products")
dates = mo.ui.date_range(label="Period")
mo.hstack([region, show_all, search, dates])
`),
      L('Interactive tables', 'mo.ui.table lets you pick rows, and the picked rows come back as a DataFrame in .value.', R`
table = mo.ui.table(df, selection="multi", page_size=10)
table

# another cell: the rows you ticked
picked = table.value
mo.md(f"Selected revenue: {picked['revenue'].sum():,.0f}")

mo.ui.dataframe(df)
mo.ui.data_explorer(df)
`),
      L('SQL cells', 'mo.sql runs DuckDB on your frames and returns a DataFrame. Braces drop widget values into the query.', R`
top = mo.sql(
    f"""
    select region, sum(price * qty) as revenue
    from df
    where price >= {min_price.value}
    group by region
    order by revenue desc
    """
)
`),
      L('Charts you can select from', 'Wrap a plotly figure and a box-select on the chart becomes data in .value.', R`
fig = px.scatter(df, x="qty", y="price", color="region")
chart = mo.ui.plotly(fig)
chart

# another cell: the points you dragged a box around
selected = pd.DataFrame(chart.value)
mo.ui.table(selected)
`),
      L('Layout', 'hstack puts things side by side, vstack stacks them, tabs and accordion hide what is not needed yet.', R`
controls = mo.hstack([region, min_price], justify="start")
body = mo.ui.tabs({
    "Chart": chart,
    "Table": table,
    "Summary": mo.md(f"**{len(filtered)}** rows"),
})
mo.vstack([controls, body])
mo.accordion({"Method notes": mo.md("Prices are in EUR.")})
`),
      L('Forms, buttons and mo.stop', 'A form holds its value until you submit. mo.stop halts a cell early, so slow work waits for the click.', R`
form = mo.ui.text_area(label="Your question").form()
run = mo.ui.run_button(label="Train model")
mo.vstack([form, run])

# another cell: nothing below mo.stop runs until the click
mo.stop(not run.value, mo.md("Press **Train model** to start"))
model = train(df)
`),
      L('Run it', 'Shell commands: edit opens the editor, run serves the notebook as a read-only app.', R`
pip install marimo
marimo edit notebook.py
marimo run notebook.py
marimo convert old_notebook.ipynb -o notebook.py
python notebook.py
`),
    ],
  },
];
