"""empty message

Revision ID: d780df13ff35
Revises: 61cb17f6be5a
Create Date: 2024-10-11 19:38:30.335185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd780df13ff35'
down_revision = '61cb17f6be5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('weight', sa.Numeric(precision=10, scale=2), nullable=False))
        batch_op.add_column(sa.Column('volume', sa.Numeric(precision=10, scale=2), nullable=False))
        batch_op.add_column(sa.Column('minimum', sa.Numeric(precision=10, scale=2), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('minimum')
        batch_op.drop_column('volume')
        batch_op.drop_column('weight')

    # ### end Alembic commands ###
