"""empty message

Revision ID: da3592e976e6
Revises: 54d228326ff9
Create Date: 2024-10-13 20:08:30.993805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da3592e976e6'
down_revision = '54d228326ff9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('customer_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'customer', ['customer_id'], ['id'])

    with op.batch_alter_table('customer_cart', schema=None) as batch_op:
        batch_op.add_column(sa.Column('customer_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'customer', ['customer_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer_cart', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('customer_id')

    with op.batch_alter_table('cart_item', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('customer_id')

    # ### end Alembic commands ###
